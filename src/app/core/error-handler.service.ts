import {Injectable} from '@angular/core';
import { NOT_A_PLUGIN_CREATOR, UPDATE_ACTIVE_PLUGIN } from '../shared/constants/errors';

@Injectable()
export class ErrorHandlerService {
    public static handleErrorFromServer(error) {
        if (error.indexOf(NOT_A_PLUGIN_CREATOR) !== -1) {
            return 'Please note that this plugin was created by another user. You do not have permissions to generate tokens.';
        }
        if (error.indexOf(UPDATE_ACTIVE_PLUGIN) !== -1) {
            return 'Please set the plugin status to INACTIVE before making changes.';
        }
        return error;
    }
}
