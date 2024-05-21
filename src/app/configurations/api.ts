import {environment} from "@env/environment";

export const  BACKEND = environment.DOMAIN;

export const BACKEND_API = `${BACKEND}${environment.API_VERSION}`;


