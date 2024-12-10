import { ConnectionNameTypes } from "../interfaces/socialAccount.interface";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import telegram from "../assets/telegram.png";
import tiktok from "../assets/tiktok.png";
import whatsapp from "../assets/whatsapp.png";
import x from "../assets/x.png";

export const getAccountImageWithType = (type: ConnectionNameTypes) => {
    switch (type) {
        case "WHATSAPP":
            return whatsapp;
        case "FACEBOOK":
            return facebook;
        case "INSTAGRAM":
            return instagram;
        case "X":
            return x;
        case "TELEGRAM":
            return telegram;
        case "TIKTOK":
            return tiktok;
        default:
            return "";
    }
};
