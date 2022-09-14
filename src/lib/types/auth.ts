import { Snowflake } from '@types';

export interface User {
    id: Snowflake;
    name: string;
    token: string;
    avatar?: string;
}
