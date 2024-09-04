export class Producto{
    constructor(
        public name: string,
        public code: string,
        public clasificacion: string,
        public type: string,
        public description: string,
        public status: string,
        public finalProductoID: {
          name:string,
          type:string,
          estado:string,
          _id: string
      },
        public imagePath: string,
        public empresa?: string,
        public peso?: string,
        public unidad?: string,
        public disponible?: string,

        public file?: string,
        public userCreated?: string,
        public userEdit?: string,
        public _id?:string
    ){}

}
