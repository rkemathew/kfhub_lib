import { Injectable } from '@angular/core';
import { SharedConstantsService } from '../../../modules/shared/services/shared-constants.service';

@Injectable()
export class TalentArchitectConstantsService extends SharedConstantsService {
    public API_VERSION = '/v1/hrms';
    public SUBSCRIPTION_URL = '/assessments/subscriptions';

    public getApiVersion() {
        return this.API_VERSION;
    }

    public getAssessmentsSubscriptionsUrl() {
        return this.getAPIUrl(this.SUBSCRIPTION_URL);
    }
}
