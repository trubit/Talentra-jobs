export interface CreateOrganizationDto {
  name: string;
}

export interface CreateDepartmentDto {
  name: string;
  code?: string;
  description?: string;
}

export interface InviteTeamMemberDto {
  email: string;
  role: 'EMPLOYER' | 'ADMIN';
  departmentId?: string;
}

export interface UpdateTeamMemberDto {
  role?: 'EMPLOYER' | 'ADMIN';
  departmentId?: string;
}
