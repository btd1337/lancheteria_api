import { EventEmitter } from 'events';
import * as restify from 'restify';

export abstract class Router extends EventEmitter {
	public abstract applyRoutes(application: restify.Server): any;

	public render(response: restify.Response, next: restify.Next) {
		return (document)=> {
			if (document) {
				this.emit('beforeRender', document);
				response.json(document);
			}else {
				response.send(404);
			}
			return next();
		};
	}
}
