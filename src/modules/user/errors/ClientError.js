import {ApolloError} from "apollo-client";


const MESSAGE_NETWORK_ERROR =  "Problemas con el servidor. Contactese con el administrador.";
const MESSAGE_VALIDATION = "Problemas de validación. Revise los datos ingresados";

export default class ClientError extends Error {
    constructor(error) {
        super(error.message);
        this.name = "ClientError";
        this.inputErrors = {}
        this.showMessage = ""
        if (error instanceof ApolloError) {

            if (error.networkError) {
                this.showMessage = MESSAGE_NETWORK_ERROR
            } else {

                if (error.graphQLErrors.length > 0) {
                    this.showMessage = MESSAGE_VALIDATION
                    error.graphQLErrors.forEach(gqlError => {
                        if (gqlError.extensions.code == "BAD_USER_INPUT") {
                            this.inputErrors = {...this.inputErrors, ...gqlError.extensions.exception.inputErrors}
                        }
                    })

                }
            }

        }
    }


}