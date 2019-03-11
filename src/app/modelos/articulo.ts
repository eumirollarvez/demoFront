import { Moment } from '../../../node_modules/moment';

export class Articulo {
	id: string;
	created_at: Moment;
	title: string;
	author: string;
	comment: string;

	constructor(id: string, created_at: Moment, title: string, author: string, comment: string) {
		this.id = id;
		this.created_at = created_at;
		this.title = title;
		this.author = author;
		this.comment = comment;
	}
}
