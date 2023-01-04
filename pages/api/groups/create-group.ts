import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db-connect";
import AccountModel from "../../../mongo/Account.model";
import GroupingModel from "../../../mongo/Grouping.model";
import ResourceModel from "../../../mongo/Resource.model";
import puppeteer from "puppeteer";
import { uploadImage } from "../image-upload/image-upload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.body?.userData?.status !== "authenticated")
      throw new Error("Not authenticated");

    await dbConnect();

    const newGroup = await GroupingModel.create({
      ...req.body?.groupData,
    });

    if (!newGroup) throw new Error("Error creating group");

    if (req.body?.groupData?.resources?.length > 0) {
      const resources = await Promise.all(
        req.body?.groupData?.resources?.map(
          async (resource: { resourceName: string; resourceLink: string }) => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(resource.resourceLink);
            const image = await page.screenshot({
              type: "jpeg",
              path: resource.resourceName + ".jpg",
            });

            const buffered = Buffer.from(image).toString("base64");

            const { imageUrl, success } = await uploadImage(
              buffered,
              resource.resourceName
            );

            if (!success) throw new Error("Error uploading image");

            const newResource = await ResourceModel.create({
              ...resource,
              resourceImage: imageUrl,
            });

            await newResource.save();

            return newResource?._id;
          }
        )
      );
      //add resources reference to group
      newGroup.resources = resources;
    }

    await newGroup.save();

    let foundAccount = await AccountModel.findOne({
      email: req.body?.userData?.email,
    });

    console.log("found account", foundAccount);
    if (!foundAccount) throw new Error("Error finding account");

    //just want a reference to group
    foundAccount.groups.push(newGroup?._id);

    await foundAccount.save();

    return res.status(200).json({ success: true, newGroup });
  } catch (error) {
    console.error("Error creating group", error);
    return res.status(500).json({ message: error, success: false });
  }
}
