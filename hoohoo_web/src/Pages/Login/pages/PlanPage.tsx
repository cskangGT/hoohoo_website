import i18next from 'i18next';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PromoCodeModal from '../../../components/Modal/PromoCodeModal';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { theme } from '../../../style';
import { QuestionaireTitleText } from '../components/styles';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-height: 100%;
  background-color: white !important;
  margin-top: 60px;

  @media screen and (max-width: 900px) {
    height: 100%;
    padding: ${theme.spacing.md};
    margin-top: 20px;
    width: calc(100% - ${theme.spacing.md} * 2);
  }
`;
const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PlanContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: ${theme.spacing.md};
  margin: 50px 0px 80px 0px;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

// 스위치 컨테이너
const PlanSwitchContainer = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 14px;
  padding: 2px;
  margin: 40px 0;
`;

const SwitchButton = styled.button<{isActive: boolean}>`
  padding: 12px 24px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  font-family: 'Fredoka';
  color: ${theme.darkGray};
  transition: all 0.3s ease;

  ${({isActive}) =>
    isActive
      ? `
    background: black;
    color: ${theme.white};
    border-radius: 14px;
  `
      : `
    background: transparent;
    color: ${theme.darkGray};
  `}
`;

// 플랜 카드 스타일
const PlanCard = styled.div<{isPopular?: boolean}>`
  position: relative;
  width: 300px;
  padding: 32px;

  border-radius: 24px;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  overflow: hidden;
  ${({isPopular}) =>
    isPopular &&
    `
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      
      background: radial-gradient(
        circle at top right,
        #92ff3feb 0%, #000000 30%
      );
      pointer-events: none; // 내부 컨텐츠 클릭 가능하도록
      z-index: 0;
    }

    &::before {
      
      position: absolute;
      top: -12px;
      right: 24px;
      background: ${theme.mainNeon};
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 500;
      z-index: 1;
    }

    // 내부 컨텐츠가 gradient 위에 보이도록
    & > * {
      position: relative;
      z-index: 1;
    }
  `}
`;
const PlanTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
const PlanTitle = styled.h3<{isPopular?: boolean}>`
  font-size: ${theme.fontSize['2xl']};
  font-weight: 600;
  color: ${theme.darkGray};
  margin: 0;
  ${({isPopular}) =>
    isPopular &&
    `
    color: ${theme.white};
  `}
`;
const ForText = styled.div<{isPopular?: boolean}>`
  font-size: ${theme.fontSize.lg};
  font-weight: 400;
  color: ${theme.inActiveGray};
  height: 50px;
  ${({isPopular}) =>
    isPopular &&
    `
    color: ${theme.white};
  `}
`;
const UnlockText = styled.div<{isPopular?: boolean}>`
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  color: ${theme.inActiveGray};
  height: 30px;

  ${({isPopular}) =>
    isPopular &&
    `
    color: ${theme.white};
  `}
`;
const OriginalPrice = styled.span<{isPopular?: boolean}>`
  text-decoration: line-through;
  text-decoration-color: ${theme.inActiveGray};
  
  font-size: ${theme.fontSize['4xl']};
  font-weight: 700;
  color: ${theme.inActiveGray};
  margin-right: 6px;
`;
const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;
const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  font-size: ${theme.fontSize['4xl']};
  font-weight: 700;
`;
const PriceUnit = styled.span<{isPopular?: boolean}>`
  font-size: ${theme.fontSize['4xl']};
  font-weight: 700;
  color: ${props => props.isPopular ? theme.white : theme.darkGray};
`;
const PriceValue = styled.span<{isPopular?: boolean}>`
  font-size: ${theme.fontSize['4xl']};
  font-weight: 700;
  color: ${props => props.isPopular ? theme.white : theme.darkGray};
`;
const PricePeriod = styled.span<{isPopular?: boolean}>`
  font-size: ${theme.fontSize.lg};
  font-weight: 400;
  color: ${props => props.isPopular ? 'rgba(255, 255, 255, 0.7)' : theme.inActiveGray};
  margin-left: 4px;
`;
const PopularTag = styled.div`
  background-color: ${theme.mainNeon};
  padding: 5px 15px;
  border-radius: 10px;
  font-size: ${theme.fontSize.rg};
  font-weight: 500;
  color: ${theme.darkGray};
  z-index: 1;
`;
const PlanFeatureTitle = styled.h3<{isPopular?: boolean}>`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: ${theme.darkGray};
  margin: 0;
  padding: 0;
  ${({isPopular}) =>
    isPopular &&
    `
    color: ${theme.white};
  `}
`;
const PlanFeatures = styled.ul<{isPopular?: boolean}>`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;

  li {
    padding: 8px 0;
    color: ${props => (props.isPopular ? theme.white : theme.inActiveGray)};
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '✓';
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background-color: ${theme.mainNeon};
      color: ${theme.darkGray};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
const PromoButton = styled.button`
  color: ${theme.inActiveGray};
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  text-decoration: underline;
  text-decoration-color: ${theme.inActiveGray};
  margin-bottom: ${theme.spacing.xl};
  cursor: pointer;
  background: none;
  border: none;
`;
const SelectButton = styled.button<{isPopular?: boolean}>`
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: 'Fredoka';
  margin: ${theme.spacing.sm} 0;
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.fontSize.md};
  ${({isPopular}) =>
    isPopular
      ? `
    background: ${theme.mainNeon};
    color: black;
  `
      : `
    background: transparent;
    border: 1px solid ${theme.darkGray};
    color: ${theme.darkGray};
  `}

  &:hover {
    opacity: 0.8;
  }
`;

function PlanPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>(
    'monthly',
  );
  const [isPromoCodeModalVisible, setIsPromoCodeModalVisible] = useState<boolean>(false);
  const localizedTexts: any = i18next.t('PlanPage', {returnObjects: true});
  const navigate = useNavigate();

  
  return (
    <Container>
      <Wrapper>
        <InnerWrapper>
          <QuestionaireTitleText
            dangerouslySetInnerHTML={{
              __html: localizedTexts.title,
            }}
          />

          <PlanSwitchContainer>
            <SwitchButton
              isActive={billingCycle === 'monthly'}
              onClick={() => setBillingCycle('monthly')}>
              {localizedTexts.monthly}
            </SwitchButton>
            <SwitchButton
              isActive={billingCycle === 'annually'}
              onClick={() => setBillingCycle('annually')}>
              {localizedTexts.annually}
            </SwitchButton>
          </PlanSwitchContainer>

          <PlanContainer>
            {localizedTexts.plans.map((plan: any, index: number) => (
              <PlanCard key={plan.name} isPopular={plan.isPopular}>
                <PlanTitleContainer>
                  <PlanTitle isPopular={plan.isPopular}>{plan.name}</PlanTitle>

                  {plan.isPopular && (
                    <PopularTag>{plan.popularText}</PopularTag>
                  )}
                </PlanTitleContainer>
                <ForText
                  isPopular={plan.isPopular}
                  dangerouslySetInnerHTML={{
                    __html: plan.for,
                  }}
                />
                <PriceContainer>
                  {plan.discountMonthPrice && billingCycle === 'monthly' && (
                    <OriginalPrice isPopular={plan.isPopular}>
                      {plan.monthlyPrice}
                    </OriginalPrice>
                  )}
                  {plan.discountYearlyPrice && billingCycle === 'annually' && (
                    <OriginalPrice isPopular={plan.isPopular}>
                      {plan.yearlyPrice}
                    </OriginalPrice>
                  )}
                  <PriceWrapper>
                    
                    <PriceValue isPopular={plan.isPopular}>
                      {billingCycle === 'monthly'
                        ? (plan.discountMonthPrice || plan.monthlyPrice)
                        : (plan.discountYearlyPrice || plan.yearlyPrice)}
                    </PriceValue>
                    <PricePeriod isPopular={plan.isPopular}>
                      /{billingCycle === 'monthly' ? localizedTexts.perMonth : localizedTexts.perYear}
                    </PricePeriod>
                  </PriceWrapper>
                </PriceContainer>
                <SelectButton
                  isPopular={plan.isPopular}
                  onClick={() => navigate(`/signup?plan=${plan.id}`)}>
                  {localizedTexts.getStarted}
                </SelectButton>
                <PlanFeatureTitle isPopular={plan.isPopular}>
                  {localizedTexts.featureTitle}
                </PlanFeatureTitle>
                {plan.unlock && (
                  <UnlockText isPopular={plan.isPopular}>
                    {plan.unlock}
                  </UnlockText>
                )}
                <PlanFeatures isPopular={plan.isPopular}>
                  {plan.features.map((feature: string) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </PlanFeatures>
              </PlanCard>
            ))}
          </PlanContainer>
          <PromoButton onClick={() => setIsPromoCodeModalVisible(true)}>
            {localizedTexts.promoButton}
          </PromoButton>
           
            <PromoCodeModal
              visible={isPromoCodeModalVisible}
              onCancel={() => setIsPromoCodeModalVisible(false)}
            />
          
        </InnerWrapper>
      </Wrapper>
    </Container>
  );
}

export default PlanPage;
