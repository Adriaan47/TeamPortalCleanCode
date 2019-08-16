import { Skills } from './skills';
export interface SearchView {
    id: string;
    name: string;
    nickname: string;
    surname: string;
    eid: string;
    careerLevel: number;
    mobile: string;
    birthDate: Date;
    skills: Skills;
}
