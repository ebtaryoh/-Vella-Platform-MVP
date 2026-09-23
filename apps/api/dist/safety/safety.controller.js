"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafetyController = void 0;
const common_1 = require("@nestjs/common");
const safety_service_1 = require("./safety.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let SafetyController = class SafetyController {
    safetyService;
    constructor(safetyService) {
        this.safetyService = safetyService;
    }
    async registerAudioUpload(payload) {
        return this.safetyService.registerAudioUpload(payload.rideId, payload.s3BucketKey, payload.fileHash);
    }
};
exports.SafetyController = SafetyController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('audio-upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SafetyController.prototype, "registerAudioUpload", null);
exports.SafetyController = SafetyController = __decorate([
    (0, common_1.Controller)('api/v1/safety'),
    __metadata("design:paramtypes", [safety_service_1.SafetyService])
], SafetyController);
//# sourceMappingURL=safety.controller.js.map