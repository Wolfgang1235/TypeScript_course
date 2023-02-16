"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const peopleList_1 = require("./peopleList");
const people_1 = require("./people");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = document.querySelector('#container');
        const people = yield (0, people_1.getPeople)();
        if (container) {
            yield (0, peopleList_1.renderPeopleList)(container, people);
            console.log(people);
        }
        else
            console.log('Could not find container element');
    }
    catch (e) {
        console.log(e);
    }
}))();
