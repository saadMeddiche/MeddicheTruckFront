import {environment} from "@env/environment";

export const  BACKEND = environment.domain;

export const BACKEND_API = `${BACKEND}${environment.apiVersion}`;


