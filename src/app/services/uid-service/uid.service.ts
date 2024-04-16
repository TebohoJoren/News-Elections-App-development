import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UidService {
  constructor() {}

  generateUniqueID(): string {
    const alphanumericCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueID = "";

    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(
        Math.random() * alphanumericCharacters.length
      );
      uniqueID += alphanumericCharacters[randomIndex];
    }

    return uniqueID;
  }
}
