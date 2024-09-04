
import { Company } from "./company.model";
export interface User{


        name: string,
        lastname: string,
        birthdate: string,
        age: string,
        socialSecurity: string,
        education: string,
        degree: string,
        contactName: string,
        contactLastname: string,
        contactPhone: string,
        email: string,
        phone: string,
        address: string,
        unit: string,
        position: string,
        permissions: string,
        compansationType: string,
        compansationValue: string,
        commission: string,
        commissionPercentage: string,
        hired: string,
        terminated: string,
        duration: string,
        reason: string,

        rol: string,
        company: Company,

        password: string,
        resetPassword: boolean,
        status: string,
        imagePath: string,
        userType: string,
        signature: string,
        userCreated: string,
        userEdit: string,
        isSelected: boolean,
        subscribe: boolean,
        verificationCode: boolean,
        createdAt: Date,
        _id?:string,
        __rowNum__?:string

}
