import Person from "../../models/personModel";
import Address from "../../models/addressModel";
import { PersonType, AddressType, Args} from "../types";


export default {
    createPerson: async (_parent:PersonType, {input}:Args) => {
        return await Person.create(input);
    },

    createAddress: async (_parent:AddressType, {input}:Args)=> {
        return await Address.create(input);
    },

    addPersonToAddress: async (_parent:never, {input}:any)=> {
        const person = await Person.findById(input.personId);
        const address = await Address.findById(input.addressId);

        if (!person!.addresses.includes(input.addressId)) {
            person!.addresses.push(input.addressId);
            await person!.save();
        }

        if (!address!.people.includes(input.personId)) {
            address!.people.push(input.personId);
            await address!.save();
        }

        const populatedAddress = await address!.populate("people");

        return populatedAddress;
    },

    removePersonFromAddress: async (_parent:never, {input}:any) => {
        const person = await Person.findById(input.personId);
        const address = await Address.findById(input.addressId);

        if (person!.addresses.includes(input.addressId)) {
            person!.addresses.splice(person!.addresses.indexOf(input.addressId), 1);
            await person!.save();
        }

        if (address!.people.includes(input.personId)) {

            address!.people.splice(address!.people.indexOf(input.personId), 1);
            await address!.save();
        }

        const populatedAddress = await address!.populate("people");
        await person!.populate("addresses");

        return populatedAddress;
    },

    deletePerson: async (_parent:never, {id}:Args)=> {
        await Person.findByIdAndDelete(id);
        return {
            id:id
        };
    },

    updatePerson: async (_parent:never, {id,input}:Args)=> {
       const updatedPerson =  await Person.findByIdAndUpdate(id,input,{new:true});
       return updatedPerson;
    }
}