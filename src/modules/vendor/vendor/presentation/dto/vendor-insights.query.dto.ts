
import { IsOptional, IsString, Matches, IsIn} from 'class-validator';

export class VendorInsightsOverviewQueryDto {
  @IsOptional()
  @IsIn(['today', 'week', 'month', 'year'])
  range?: 'today' | 'week' | 'month' | 'year' = 'month';
}