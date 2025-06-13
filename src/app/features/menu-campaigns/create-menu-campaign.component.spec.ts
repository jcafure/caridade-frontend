import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuCampaignComponent } from './create-menu-campaign.component';

describe('CreateMenuCampaignComponent', () => {
  let component: CreateMenuCampaignComponent;
  let fixture: ComponentFixture<CreateMenuCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMenuCampaignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMenuCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
