import scss from './CartPromoCode.module.scss';

export default function CartPromoCode({
  promoCodeInput,
  setPromoCodeInput,
  appliedPromoCode,
  handleApplyPromoCode,
  handleRemovePromoCode,
}) {
  return (
    <div className={scss.promoCodeContainerWidthApplied}>
      <div className={scss.promoCodeContainer}>
        <input
          type='text'
          value={promoCodeInput}
          onChange={(e) => setPromoCodeInput(e.target.value)}
          placeholder='Promo code'
          className={scss.promoCodeInput}
          disabled={!!appliedPromoCode} // Отключаем поле ввода, если промокод применен
        />
        <button
          className={scss.applyPromoButton}
          onClick={handleApplyPromoCode}
          disabled={!!appliedPromoCode} // Отключаем кнопку, если промокод применен
        >
          Apply
        </button>
      </div>
      {appliedPromoCode && (
        <div className={scss.promoAppliedContainer}>
          <p className={scss.promoApplied}>
            Promo applied: {appliedPromoCode.name} (
            <span>-{appliedPromoCode.discountPercent}%</span>)
          </p>
          <button className={scss.removePromoButton} onClick={handleRemovePromoCode}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
