import * as bc from "./BuilderComm";
import * as an from "./AnyGraph";
import * as odrlCore from "./odrlCoreVocabulary";

/**
 * Constraint Class as defined by the ODRL IM
 */
export class Constraint extends an.AnyGraph {
    constructor(uid: string, leftOperand: string, operator: string, rightOperand?: string, rightOperandReference?: string){
        super(uid);
        super.setPropValue(odrlCore.leftOperand, leftOperand);
        super.setPropValue(odrlCore.operator, operator);
        if (rightOperand){
            super.setPropValue(odrlCore.rightOperand, rightOperand);
        }
        else {
            if (rightOperandReference){
                super.setPropValue(odrlCore.rightOperandReference, rightOperandReference);
            }
        }
    }

    setDataType(dataType: string): bc.BResponse{
        return super.setPropValue(odrlCore.dataType, dataType)
    }
    setUnit(unit: string): bc.BResponse{
        return super.setPropValue(odrlCore.unit, unit)
    }
    setStatus(status: string): bc.BResponse{
        return super.setPropValue(odrlCore.status, status)
    }

    addActionRefinement(dummy: string): bc.BResponse{
        let bres: bc.BResponse = {status : bc.st1502}; // not supported
        return bres;
    }
}

/**
 * Constraint Class as defined by the ODRL IM
 */
export class LogicalConstraint extends an.AnyGraph {
    lc_operand : string
    constructor(uid: string, operand: string){
        super(uid)
        this.lc_operand = operand;
    }

    addConstraint(constraint: string): bc.BResponse{
        return super.addPropValue(this.lc_operand, constraint);
    }

    addActionRefinement(dummy: string): bc.BResponse{
        let bres: bc.BResponse = {status : bc.st1502}; // not supported
        return bres;
    }

}
