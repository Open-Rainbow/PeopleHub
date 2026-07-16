import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class SkillsComponent implements OnInit {
    private readonly commonService;
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    readonly formConfig: import("../../config/form-configs/skills.model").ISkillsFormFields;
    skills: FormGroup;
    skillCategoryOptions$: Observable<DropdownOption[]>;
    proficiencyOptions$: Observable<DropdownOption[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SkillsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SkillsComponent, "employees-skills", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=skills.component.d.ts.map