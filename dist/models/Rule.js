"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc = require("./BuilderComm");
const an = require("./AnyGraph");
const odrlCore = require("./odrlCoreVocabulary");
/**
 * Rule Class as defined by the ODRL IM
 */
class Rule extends an.AnyGraph {
    constructor(uid, action) {
        super(uid);
        this.constructionStatus = super.setPropValue(odrlCore.action, action);
    }
    addConstraint(constraint) {
        return super.addPropValue(odrlCore.constraint, constraint);
    }
}
exports.Rule = Rule;
/**
 * Permission sub-class of Rule class as defined by the ODRL IM
 */
class Permission extends Rule {
    constructor(uid, action, target) {
        super(uid, action);
        if (this.constructionStatus.status !== bc.stOK) {
            return;
        }
        this.constructionStatus = super.setPropValue(odrlCore.target, target);
    }
    setAssigner(assigner) {
        return super.setPropValue(odrlCore.assigner, assigner);
    }
    setAssignee(assignee) {
        return super.setPropValue(odrlCore.assignee, assignee);
    }
    addDuty(duty) {
        return super.setPropValue(odrlCore.duty, duty);
    }
}
exports.Permission = Permission;
/**
 * Prohibition sub-class of Rule class as defined by the ODRL IM
 */
class Prohibition extends Rule {
    constructor(uid, action, target) {
        super(uid, action);
        if (this.constructionStatus.status !== bc.stOK) {
            return;
        }
        this.constructionStatus = super.setPropValue(odrlCore.target, target);
    }
    setAssigner(assigner) {
        return super.setPropValue(odrlCore.assigner, assigner);
    }
    setAssignee(assignee) {
        return super.setPropValue(odrlCore.assignee, assignee);
    }
    addRemedy(remedy) {
        return super.setPropValue(odrlCore.remedy, remedy);
    }
}
exports.Prohibition = Prohibition;
/**
 * (Basic) Duty sub-class of Rule class without constraints - as defined by the ODRL IM
 */
class DutyB extends Rule {
    constructor(uid, action, target) {
        super(uid, action);
        if (this.constructionStatus.status !== bc.stOK) {
            return;
        }
        if (target) {
            this.constructionStatus = super.setPropValue(odrlCore.target, target);
        }
    }
    setAssigner(assigner) {
        return super.setPropValue(odrlCore.assigner, assigner);
    }
    setAssignee(assignee) {
        return super.setPropValue(odrlCore.assignee, assignee);
    }
}
exports.DutyB = DutyB;
/**
 * (Extended) Duty sub-class of Rule class with constraints - as defined by the ODRL IM
 */
class DutyE extends DutyB {
    constructor(uid, action, target) {
        super(uid, action, target);
        if (this.constructionStatus.status !== bc.stOK) {
            return;
        }
        if (target) {
            this.constructionStatus = super.setPropValue(odrlCore.target, target);
        }
    }
    setAssigner(assigner) {
        return super.setAssigner(assigner);
    }
    setAssignee(assignee) {
        return super.setAssignee(assignee);
    }
}
exports.DutyE = DutyE;
//# sourceMappingURL=Rule.js.map