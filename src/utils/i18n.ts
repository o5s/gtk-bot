import fs from 'fs';
import { FluentBundle, FluentError, FluentResource } from '@fluent/bundle';

interface I18nOptions {
  resources?: string;
}

let bundle: { addResource: any; formatPattern: any; getMessage: any } | undefined;

export function init(locales: string | string[], options?: I18nOptions) {
  bundle = new FluentBundle(locales, options);

  if (!!options) {
    if (!!options.resources) {
      if (Array.isArray(locales)) {
        locales.forEach(locale => {
          loadResource(`${options.resources}/${locale}.ftl`);
        });
      } else {
        loadResource(`${options.resources}/${locales}.ftl`);
      }
    }
  }
}

export function loadResource(p: string) {
  if (!bundle) {
    throw new FluentError('Fluent has not been initialized yet');
  }

  const file = fs.readFileSync(p, 'utf8');
  const resource = new FluentResource(file.toString());

  bundle.addResource(resource);
}

export function translate(key: string, variables?: {}): string {
  if (!bundle) {
    throw new FluentError('Fluent has not been initialized yet');
  }

  const message = bundle.getMessage(key);

  return bundle.formatPattern(message.value, variables);
}
