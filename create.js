import { v1 as uuidv1 } from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import {success, failure} from "./libs/response-lib";

export async function main(event, context, callback) {

    const data = JSON.parse(event.body);

    const params = {
        TableName : process.env.TableName,

        Item : {
            userId : event.requestContext.identity.cognitoIdentityId,
            noteId : uuidv1(),
            context : data.context,
            attachment : data.attachment,
            createdAt : Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (error) {
        return failure({status : false});
    }

}