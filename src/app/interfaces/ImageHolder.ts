import {ImageType} from "../enums/ImageType";
import {BaseModel} from "../components/base/models/BaseModel";

/*
* This interface will be used to hold the image data
* There two types of images: LOCAL and REMOTE
* LOCAL - Represents the images that are uploaded by the user
* REMOTE - Represents the images that are already stored in the server
* */
export interface ImageHolder extends BaseModel
{
  name: string;
  type: ImageType;
  source: string;
}
