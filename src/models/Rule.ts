import * as bc from "./BuilderComm";
import * as an from "./AnyGraph"
import * as odrlCore from "./odrlCoreVocabulary";

/**
 * Rule Class as defined by the ODRL IM
 */
export class Rule extends an.AnyGraph {
    constructor(uid: string, action: string){
        super(uid);
        this.constructionStatus = super.setPropValue(odrlCore.action, action)
    }

    addConstraint(constraint: string): bc.BResponse{
        return super.addPropValue(odrlCore.constraint, constraint);
    }
}

/**
 * Permission sub-class of Rule class as defined by the ODRL IM
 */
export class Permission extends Rule {
    constructor(uid: string, action: string, target: string){
        super (uid, action);
        if (this.constructionStatus.status !== bc.stOK){
            return;
        }
        this.constructionStatus = super.setPropValue(odrlCore.target, target)
    }

    setAssigner(assigner: string): bc.BResponse{
        return super.setPropValue(odrlCore.assigner, assigner);
    }

    setAssignee(assignee: string): bc.BResponse{
        return super.setPropValue(odrlCore.assignee, assignee);
    }

    addDuty(duty: string): bc.BResponse{
        return super.setPropValue(odrlCore.duty, duty)
    }
}

/**
 * Prohibition sub-class of Rule class as defined by the ODRL IM
 */
export class Prohibition extends Rule {
    constructor(uid: string, action: string, target: string){
        super (uid, action);
        if (this.constructionStatus.status !== bc.stOK){
            return;
        }
        this.constructionStatus = super.setPropValue(odrlCore.target, target)
    }

    setAssigner(assigner: string): bc.BResponse{
        return super.setPropValue(odrlCore.assigner, assigner);
    }

    setAssignee(assignee: string): bc.BResponse{
        return super.setPropValue(odrlCore.assignee, assignee);
    }

    addRemedy(remedy: string): bc.BResponse{
        return super.setPropValue(odrlCore.remedy, remedy)
    }
}

/**
 * (Basic) Duty sub-class of Rule class without constraints - as defined by the ODRL IM
 */
export class DutyB extends Rule {
    constructor(uid: string, action: string, target?: string){
        super (uid, action);
        if (this.constructionStatus.status !== bc.stOK){
            return;
        }
        if (target){
            this.constructionStatus = super.setPropValue(odrlCore.target, target);
        }

    }

    setAssigner(assigner: string): bc.BResponse{
        return super.setPropValue(odrlCore.assigner, assigner);
    }

    setAssignee(assignee: string): bc.BResponse{
        return super.setPropValue(odrlCore.assignee, assignee);
    }
}

/**
 * (Extended) Duty sub-class of Rule class with constraints - as defined by the ODRL IM
 */
export class DutyE extends DutyB {
    consequenceUids: string[];
    constructor(uid: string, action: string, target?: string){
        super (uid, action, target);
        if (this.constructionStatus.status !== bc.stOK){
            return;
        }
        if (target){
            this.constructionStatus = super.setPropValue(odrlCore.target, target);
        }
    }

    setAssigner(assigner: string): bc.BResponse{
        return super.setAssigner(assigner);
    }

    setAssignee(assignee: string): bc.BResponse{
        return super.setAssignee(assignee);
    }

}