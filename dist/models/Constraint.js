"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc = require("./BuilderComm");
const an = require("./AnyGraph");
const odrlCore = require("./odrlCoreVocabulary");
/**
 * Constraint Class as defined by the ODRL IM
 */
class Constraint extends an.AnyGraph {
    constructor(uid, leftOperand, operator, rightOperand, rightOperandReference) {
        super(uid);
        super.setPropValue(odrlCore.leftOperand, leftOperand);
        super.setPropValue(odrlCore.operator, operator);
        if (rightOperand) {
            super.setPropValue(odrlCore.rightOperand, rightOperand);
        }
        else {
            if (rightOperandReference) {
                super.setPropValue(odrlCore.rightOperandReference, rightOperandReference);
            }
        }
    }
    setDataType(dataType) {
        return super.setPropValue(odrlCore.dataType, dataType);
    }
    setUnit(unit) {
        return super.setPropValue(odrlCore.unit, unit);
    }
    setStatus(status) {
        return super.setPropValue(odrlCore.status, status);
    }
    addActionRefinement(dummy) {
        let bres = { status: bc.st1502 }; // not supported
        return bres;
    }
}
exports.Constraint = Constraint;
/**
 * Constraint Class as defined by the ODRL IM
 */
class LogicalConstraint extends an.AnyGraph {
    constructor(uid, operand) {
        super(uid);
        this.lc_operand = operand;
    }
    addConstraint(constraint) {
        return super.addPropValue(this.lc_operand, constraint);
    }
    addActionRefinement(dummy) {
        let bres = { status: bc.st1502 }; // not supported
        return bres;
    }
}
exports.LogicalConstraint = LogicalConstraint;
//# sourceMappingURL=Constraint.js.map