import {WishlistStatus} from "./WishlistStatus.ts";

export type Restaurant = {
    id: string;
    name: string;
    city: string;
    category: string;
    description: string;
    status: WishlistStatus;

}

