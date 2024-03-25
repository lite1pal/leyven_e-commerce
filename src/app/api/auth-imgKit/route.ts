import {
  API_KEY,
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_URL,
} from "@/config/api";
import { errorResponse, successResponse } from "@/libs/utils";
import ImageKit from "imagekit";

export async function GET() {
  try {
    const imagekit = new ImageKit({
      urlEndpoint: IMAGEKIT_URL,
      publicKey: IMAGEKIT_PUBLIC_KEY,
      privateKey: IMAGEKIT_PRIVATE_KEY,
    });

    const result = imagekit.getAuthenticationParameters();

    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
