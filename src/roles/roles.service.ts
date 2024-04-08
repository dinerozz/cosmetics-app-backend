import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async seedRoles() {
    const rolesToCreate = [
      { value: "ADMIN", description: "Administrator" },
      { value: "USER", description: "User" },
    ];

    const rolesResults = [];

    for (const role of rolesToCreate) {
      const [roleResult, created] = await this.roleRepository.findOrCreate({
        where: { value: role.value },
        defaults: { ...role },
      });

      if (created) {
        console.log(`Рлдб ${roleResult.value} успешно добавлена.`);
      } else {
        console.log(`Роль ${roleResult.value} уже существует.`);
      }

      rolesResults.push(roleResult);
    }

    return rolesResults;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
