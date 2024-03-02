export class APIError extends Error {
    /**
        @message messagem amigavel para usuario final 
        @code identificador unico para rastreamento do error na api
        @detail messagem detalada do erro, ultilizada para integrações da api
        @statusCode codigo de return de request http
        @data dados completamentares para registro de logs (não sai retornados pela api)

        Inherit
        @status 
        @statusDetail 
        @statusCode 
    */
    constructor(
        public message: string,
        public code: string,
        public detail: string,
        public statusCode?: number,
        public data?: any
    ) {
        super(message);
    }
}
