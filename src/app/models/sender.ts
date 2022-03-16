import {Person} from "./person";
import {WorkExperience} from "./work-experience";
import {Education} from "./education";
import {Personsocialnetwork} from "./personsocialnetwork";
import {Document} from "./document";
import {Additionalinformations} from "./additionalinformations";


export class Sender {
  person?: Person;
  personEducation?: Education;
  personEducation2?: Education;
  workExperience?: WorkExperience;
  workExperience2?: WorkExperience;
  personsocialnetworks?: Personsocialnetwork;
  personsocialnetworks2?: Personsocialnetwork;
  cv?: Document;
  additionalinformation?:Additionalinformations;
}
