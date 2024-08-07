import "server-only";

import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

export const xssSanitize = (value) => {
    return purify.sanitize(value);
}

