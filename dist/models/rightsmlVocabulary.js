"use strict";
// this file reflects the terms defined by the RightsML Profile of ODRL
// genuine RightsML terms
// base URI: http://iptc.org/std/RightsML/2011-10-07/ ?
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileUrl = 'https://iptc.org/std/RightsML/odrl-profile/';
// ODRL Common Vocabulary terms adopted by IPTC for RightsML
// base URI: http://www.w3.org/ns/odrl/2/
// RightsML terms as JS constants
// A sequence of: Actions
exports.acceptTracking = "http://www.w3.org/ns/odrl/2/acceptTracking";
exports.aggregate = "http://www.w3.org/ns/odrl/2/aggregate";
exports.annotate = "http://www.w3.org/ns/odrl/2/annotate";
exports.anonymize = "http://www.w3.org/ns/odrl/2/anonymize";
exports.archive = "http://iptc.org/std/RightsML/2011-10-07/archive";
exports.attribute = "http://www.w3.org/ns/odrl/2/attribute";
exports.compensate = "http://www.w3.org/ns/odrl/2/compensate";
exports.concurrentUse = "http://www.w3.org/ns/odrl/2/concurrentUse";
exports.deleteAction = "http://www.w3.org/ns/odrl/2/delete";
exports.derive = "http://www.w3.org/ns/odrl/2/derive";
exports.digitize = "http://www.w3.org/ns/odrl/2/digitize";
exports.display = "http://www.w3.org/ns/odrl/2/display";
exports.distribute = "http://www.w3.org/ns/odrl/2/distribute";
exports.ensureExclusivity = "http://www.w3.org/ns/odrl/2/ensureExclusivity";
exports.execute = "http://www.w3.org/ns/odrl/2/execute";
exports.extract = "http://www.w3.org/ns/odrl/2/extract";
exports.give = "http://www.w3.org/ns/odrl/2/give";
exports.grantUse = "http://www.w3.org/ns/odrl/2/grantUse";
exports.include = "http://www.w3.org/ns/odrl/2/include";
exports.index = "http://www.w3.org/ns/odrl/2/index";
exports.inform = "http://www.w3.org/ns/odrl/2/inform";
exports.modify = "http://www.w3.org/ns/odrl/2/modify";
exports.move = "http://www.w3.org/ns/odrl/2/move";
exports.nextPolicy = "http://www.w3.org/ns/odrl/2/nextPolicy";
exports.obtainConsent = "http://www.w3.org/ns/odrl/2/obtainConsent";
exports.play = "http://www.w3.org/ns/odrl/2/play";
exports.present = "http://www.w3.org/ns/odrl/2/present";
exports.print = "http://www.w3.org/ns/odrl/2/print";
exports.reproduce = "http://www.w3.org/ns/odrl/2/reproduce";
exports.reviewPolicy = "http://www.w3.org/ns/odrl/2/reviewPolicy";
exports.sell = "http://www.w3.org/ns/odrl/2/sell";
exports.stream = "http://www.w3.org/ns/odrl/2/stream";
exports.synchronize = "http://www.w3.org/ns/odrl/2/synchronize";
exports.textToSpeech = "http://www.w3.org/ns/odrl/2/textToSpeech";
exports.transform = "http://www.w3.org/ns/odrl/2/transform";
exports.translate = "http://www.w3.org/ns/odrl/2/translate";
exports.watermark = "http://www.w3.org/ns/odrl/2/watermark";
// A sequence of: LeftOperands
exports.absolutePosition = "http://www.w3.org/ns/odrl/2/absolutePosition";
exports.absoluteSize = "http://www.w3.org/ns/odrl/2/absoluteSize";
exports.absoluteSpatialPosition = "http://www.w3.org/ns/odrl/2/absoluteSpatialPosition";
exports.absoluteTemporalPosition = "http://www.w3.org/ns/odrl/2/absoluteTemporalPosition";
exports.percentage = "http://www.w3.org/ns/odrl/2/percentage";
exports.count = "http://www.w3.org/ns/odrl/2/count";
exports.dateTime = "http://www.w3.org/ns/odrl/2/dateTime";
exports.delayPeriod = "http://www.w3.org/ns/odrl/2/delayPeriod";
exports.deliveryChannel = "http://www.w3.org/ns/odrl/2/deliveryChannel";
exports.elapsedTime = "http://www.w3.org/ns/odrl/2/elapsedTime";
exports.event = "http://www.w3.org/ns/odrl/2/event";
exports.fileFormat = "http://www.w3.org/ns/odrl/2/fileFormat";
exports.spatialCoordinates = "http://www.w3.org/ns/odrl/2/spatialCoordinates";
exports.spatial = "http://www.w3.org/ns/odrl/2/spatial";
exports.industry = "http://www.w3.org/ns/odrl/2/industry";
exports.language = "http://www.w3.org/ns/odrl/2/language";
exports.media = "http://www.w3.org/ns/odrl/2/media";
exports.meteredTime = "http://www.w3.org/ns/odrl/2/meteredTime";
exports.payAmount = "http://www.w3.org/ns/odrl/2/payAmount";
exports.product = "http://www.w3.org/ns/odrl/2/product";
exports.purpose = "http://www.w3.org/ns/odrl/2/purpose";
exports.recipient = "http://www.w3.org/ns/odrl/2/recipient";
exports.timeInterval = "http://www.w3.org/ns/odrl/2/timeInterval";
exports.relativePosition = "http://www.w3.org/ns/odrl/2/relativePosition";
exports.relativeSize = "http://www.w3.org/ns/odrl/2/relativeSize";
exports.relativeSpatialPosition = "http://www.w3.org/ns/odrl/2/relativeSpatialPosition";
exports.relativeTemporalPosition = "http://www.w3.org/ns/odrl/2/relativeTemporalPosition";
exports.resolution = "http://www.w3.org/ns/odrl/2/resolution";
exports.systemDevice = "http://www.w3.org/ns/odrl/2/systemDevice";
exports.unitOfCount = "http://www.w3.org/ns/odrl/2/unitOfCount";
exports.version = "http://www.w3.org/ns/odrl/2/version";
exports.virtualLocation = "http://www.w3.org/ns/odrl/2/virtualLocation";
exports.compensationValue = "http://iptc.org/std/RightsML/2011-10-07/compensationValue";
// A sequence of: Party Functions
exports.attributedParty = "http://www.w3.org/ns/odrl/2/attributedParty";
exports.compensatedParty = "http://www.w3.org/ns/odrl/2/compensatedParty";
exports.compensatingParty = "http://www.w3.org/ns/odrl/2/compensatingParty";
exports.consentedParty = "http://www.w3.org/ns/odrl/2/consentedParty";
exports.consentingParty = "http://www.w3.org/ns/odrl/2/consentingParty";
exports.informedParty = "http://www.w3.org/ns/odrl/2/informedParty";
exports.informingParty = "http://www.w3.org/ns/odrl/2/informingParty";
exports.trackedParty = "http://www.w3.org/ns/odrl/2/trackedParty";
exports.trackingParty = "http://www.w3.org/ns/odrl/2/trackingParty";
// A sequence of: RightOperands
exports.policyUsage = "http://www.w3.org/ns/odrl/2/policyUsage";
// A sequence of: Sub-Properties
exports.output = "http://www.w3.org/ns/odrl/2/output";
//# sourceMappingURL=rightsmlVocabulary.js.map