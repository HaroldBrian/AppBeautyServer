"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMeetDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_meet_dto_1 = require("./create-meet.dto");
class UpdateMeetDto extends (0, mapped_types_1.PartialType)(create_meet_dto_1.CreateMeetDto) {
}
exports.UpdateMeetDto = UpdateMeetDto;
//# sourceMappingURL=update-meet.dto.js.map