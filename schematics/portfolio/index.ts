import {
    Rule,
    SchematicContext,
    Tree,
    apply,
    mergeWith,
    template,
    url,
    move
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { Schema } from './schema';

export function portfolio(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info(`🚀 Génération du portfolio: ${options.name}`);

        if (!options.name) {
            throw new Error('Le nom du portfolio est requis');
        }

        context.logger.info(`✅ Portfolio '${options.name}' préparé`);
        context.logger.info(`📝 Exécute 'npm run setup' pour configurer votre portfolio`);

        return tree;
    };
}

interface Schema {
    name: string;
    interactive?: boolean;
}
