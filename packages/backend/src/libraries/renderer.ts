import ejs from 'ejs';

export const renderHTML = (
    template: string,
    data: Record<string, string | number>
) => ejs.render(template, data);
