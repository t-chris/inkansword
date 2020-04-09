import stripeModule from "stripe";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const { storage, source } = JSON.parse(event.body); //
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    const stripe = stripeModule(process.env.stripeSecretKey);

    try {
        await stripe.charges.create({
            source,
            amount,
            description,
            currency: "cad"
        });
        return success({ status : true });
    }
    catch(e) {
        return failure({ status : false });
    }
}

const calculateCost = (storage) => {
    var rate = null;
    if ( storage <= 10 ) {
        rate = 4;
    }
    else if ( storage <= 100) {
        rate = 2;
    }
    else {
        rate = 1;
    }

    return rate*storage*100;
};