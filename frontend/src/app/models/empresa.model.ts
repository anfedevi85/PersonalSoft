export class Empresa{
    constructor(
        public nombre: string,
        public documento?: string,
        public web?: string,
        public direccion?: string,
        public contacto?: string,
        public numContacto?: string,
        public telefono?: string,
        public contrato?: string,
        public fechaFinal?: string,
        public users?: 
        [    userID: string]
        ,
        public imagePath?: string,
        public status?: string,
        public userCreated?: string,
        public userEdit?: string,
        public _id?:string,
        public __rowNum__?:string,

    ){}

}