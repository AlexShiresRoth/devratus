import { NextApiRequest, NextApiResponse } from "next";
import GroupingModel from "../../../mongo/Grouping.model";
import ResourceModel from "../../../mongo/Resource.model";
import { authCheck } from "../auth/auth-check";
import { authOptions } from "../auth/[...nextauth]";
import puppeteer from "puppeteer";
import { uploadImage } from "../image-upload/image-upload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authCheck(req, res, authOptions);

  try {
    const { groupId, resources } = req.body;

    if (!groupId) return res.status(400).json({ message: "Missing group id" });

    const foundGroup = await GroupingModel.findById(groupId);

    if (!foundGroup)
      return res.status(404).json({ message: "Group not found" });

    await Promise.all(
      resources.map(
        async (resource: { resourceName: string; resourceLink: string }) => {
          const { resourceName, resourceLink } = resource;
          if (!resourceName)
            return res.status(400).json({ message: "Missing resource name" });

          if (!resourceLink)
            return res.status(400).json({ message: "Missing resource link" });

          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(resourceLink);
          const image = await page.screenshot({
            type: "jpeg",
            path: resourceName + ".jpg",
          });

          const buffered = Buffer.from(image).toString("base64");

          const { imageUrl, success } = await uploadImage(
            buffered,
            resourceName
          );

          if (!success)
            return res.status(500).json({
              message: "Internal server error: Could not upload image",
            });

          const newResource = await ResourceModel.create({
            resourceName,
            resourceLink,
            resourceImage: imageUrl,
          });

          await newResource.save();

          foundGroup.resources.unshift(newResource?._id);

          return foundGroup;
        }
      )
    );

    await foundGroup.save();

    console.log("foundGroup", foundGroup);
    //pass the updated group  with new resources to the front end
    return res.status(200).json({
      success: true,
      message: "Resource added",
      updatedGroup: foundGroup,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
