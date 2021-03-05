import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Role } from '@prisma/client';
import { Author } from "../authors/dto/author";
import { Book } from '../books/dto/book';
import { Genre } from "../genres/dto/genre";
import { Review } from "../reviews/dto/review";
import { ShoppingCart } from "../shopping-cart/dto/shopping-cart";

import { User } from '../users/dto/user';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete'
}

type Subjects = InferSubjects<
  typeof Author |
  typeof Book |
  typeof Genre |
  typeof Review |
  typeof ShoppingCart |
  typeof User |
  'all'
>;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: {
    id: string,
    email: string,
    roles: Role[]
  }): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    const isAdmin = user.roles.some((role) => {
      return role.name === 'admin'
    });

    if(isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }

    can(Action.Update, User, { id: user.id });
    can(Action.Create, Review, { userId: user.id });
    can(Action.Update, Review, { userId: user.id });
    can(Action.Delete, Review, { userId: user.id });
    can(Action.Create, ShoppingCart, { userId: user.id });
    can(Action.Update, ShoppingCart, { userId: user.id });
    can(Action.Delete, ShoppingCart, { userId: user.id });

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
