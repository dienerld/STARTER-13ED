import { Profile } from '../../../shared/enums';

export interface CreateUserDTO {
	username: string;
	name: string;
	password: string;
	profile: Profile;
	company?: string;
}
