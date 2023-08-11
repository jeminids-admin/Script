// v.2.1
// Initial State
$('.calculator-input-wrap, .calculator-result').hide();

// Open input
$('.calculator-header').click(function () {
    $(this).siblings('.calculator-input-wrap').toggle();
    $(this).hide();
});

// Close input
$('.calculator-title-open').click(function () {
    const $calculatorItem = $(this).closest('.calculator-item');
    $calculatorItem.find('.calculator-header').show();
    $calculatorItem.find('.calculator-input-wrap').hide();
});

// Close result
$('.calculator-result-back').click(function () {
    $('#calculator_section, .calculator-header').show();
    $('.calculator-result, .calculator-input-wrap').hide();
    $('.calculator-input-wrap .button').addClass('disabled');
    $('.calculator-input-wrap input').val('');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});


// Chehk conditions
$('.calculator-input-wrap input').on('input', function () {
    var inputWraps = $(this).closest('.calculator-input-wrap');
    var allInputsFilled = inputWraps.find('input').toArray().every(function (input) {
        return $(input).val() !== '';
    });

    if (allInputsFilled) {
        inputWraps.find('a').removeClass('disabled');
    } else {
        inputWraps.find('a').addClass('disabled');
    }
});

// Enter to submit
$('input').on('keypress', function (e) {
    if (e.which == 13) { // Enter key pressed
        if (!$(this).val()) {
            e.preventDefault(); // Prevent default action of following the link
        } else {
            $(this).closest('.calculator-input-wrap').find('a').click();
        }
    }
});

// Open 1. Transfer Costs Calculator
$('#button_tc').click(function () {
    $('#result_tc').show();
    $('#calculator_section').hide();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});

// Open 2. Bond Costs Calculator 
$('#button_bc').click(function () {
    $('#result_bc').show();
    $('#calculator_section').hide();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});

// Open 3. Bond Instalments Calculator
$('#button_bi').click(function () {
    $('#result_bi').show();
    $('#calculator_section').hide();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});

// Open 4. Commission Calculator
$('#button_cs').click(function () {
    $('#result_cs').show();
    $('#calculator_section').hide();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});

// Funtions 
function formatCurrency(value) {
    return 'R' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function unFormatCurrency(selector) {
    return parseFloat($(selector).text().replace(/[^0-9.-]+/g, ""));
}
function formatYear(num) {
    if (num > 1) {
        return num + ' years';
    } else {
        return num + ' year';
    }
}
function formatPercentage(num) {
    return num + '%';
}

// 1. Transfer Costs Calculator
$('#tc_input').on('input', function () {
    const tc_input = parseFloat($(this).val());

    // Purchase Price
    if (tc_input <= 0) {
        $('#tc_pp').text('0.00');
    } else {
        $('#tc_pp').text(formatCurrency(tc_input));
    }

    // Conveyancing Tariff Fee
    const ctf_ranges = [
        { min: 0, max: 100000, base_fee: 6110 },
        { min: 100001, max: 150000, base_fee: 6110, increment_fee: 975, increment_treshold: 50000 },
        { min: 150001, max: 200000, base_fee: 7085, increment_fee: 975, increment_treshold: 50000 },
        { min: 200001, max: 250000, base_fee: 8060, increment_fee: 975, increment_treshold: 50000 },
        { min: 250001, max: 300000, base_fee: 9035, increment_fee: 975, increment_treshold: 50000 },
        { min: 300001, max: 350000, base_fee: 10010, increment_fee: 975, increment_treshold: 50000 },
        { min: 350001, max: 400000, base_fee: 10985, increment_fee: 975, increment_treshold: 50000 },
        { min: 400001, max: 450000, base_fee: 11960, increment_fee: 975, increment_treshold: 50000 },
        { min: 450001, max: 500000, base_fee: 12935, increment_fee: 975, increment_treshold: 50000 },
        { min: 500001, max: 600000, base_fee: 13910, increment_fee: 1885, increment_treshold: 100000 },
        { min: 600001, max: 700000, base_fee: 15795, increment_fee: 1885, increment_treshold: 100000 },
        { min: 700001, max: 800000, base_fee: 17680, increment_fee: 1885, increment_treshold: 100000 },
        { min: 800001, max: 900000, base_fee: 19565, increment_fee: 1885, increment_treshold: 100000 },
        { min: 900001, max: 1000000, base_fee: 21450, increment_fee: 1885, increment_treshold: 100000 },
        { min: 1000001, max: 1200000, base_fee: 23335, increment_fee: 1885, increment_treshold: 200000 },
        { min: 1200001, max: 1400000, base_fee: 25220, increment_fee: 1885, increment_treshold: 200000 },
        { min: 1400001, max: 1600000, base_fee: 27105, increment_fee: 1885, increment_treshold: 200000 },
        { min: 1600001, max: 1800000, base_fee: 28990, increment_fee: 1885, increment_treshold: 200000 },
        { min: 1800001, max: 2000000, base_fee: 30875, increment_fee: 1885, increment_treshold: 200000 },
        { min: 2000001, max: 2200000, base_fee: 32760, increment_fee: 1885, increment_treshold: 200000 },
        { min: 2200001, max: 2400000, base_fee: 34645, increment_fee: 1885, increment_treshold: 200000 },
        { min: 2400001, max: 2600000, base_fee: 36530, increment_fee: 1885, increment_treshold: 200000 },
        { min: 2600001, max: 2800000, base_fee: 38415, increment_fee: 1885, increment_treshold: 200000 },
        { min: 2800001, max: 3000000, base_fee: 40300, increment_fee: 1885, increment_treshold: 200000 },
        { min: 3000001, max: 3200000, base_fee: 42185, increment_fee: 1885, increment_treshold: 200000 },
        { min: 3200001, max: 3400000, base_fee: 44070, increment_fee: 1885, increment_treshold: 200000 },
        { min: 3400001, max: 3600000, base_fee: 45955, increment_fee: 1885, increment_treshold: 200000 },
        { min: 3600001, max: 3800000, base_fee: 47840, increment_fee: 1885, increment_treshold: 200000 },
        { min: 3800001, max: 4000000, base_fee: 49725, increment_fee: 1885, increment_treshold: 200000 },
        { min: 4000001, max: 4200000, base_fee: 51610, increment_fee: 1885, increment_treshold: 200000 },
        { min: 4200001, max: 4400000, base_fee: 53495, increment_fee: 1885, increment_treshold: 200000 },
        { min: 4400001, max: 4600000, base_fee: 55380, increment_fee: 1885, increment_treshold: 200000 },
        { min: 4600001, max: 4800000, base_fee: 57265, increment_fee: 1885, increment_treshold: 200000 },
        { min: 4800001, max: 5000000, base_fee: 59150, increment_fee: 1885, increment_treshold: 200000 },
        { min: 5000001, max: Infinity, base_fee: 61035, increment_fee: 4750, increment_treshold: 1000000 }
    ];


    for (const feeRange of ctf_ranges) {
        if (tc_input >= feeRange.min && tc_input <= feeRange.max) {
            if (feeRange.increment_fee) {
                const balance = Math.floor((tc_input - (feeRange.min - 1)) / feeRange.increment_treshold);

                ctf_total = balance < 1 ? feeRange.base_fee : feeRange.base_fee + (balance * feeRange.increment_fee);

            } else {
                ctf_total = feeRange.base_fee;
            }
            break;
        }
    }

    $('#tc_ctf').text(formatCurrency(ctf_total));


    // Transfer Duty

    if (tc_input <= 0) {
        $('#tc_td').text('0.00');
    } else if (tc_input <= 1100000) {
        $('#tc_td').text('0.00');

    } else if (tc_input > 1100000 && tc_input <= 1512500) {
        const percentage = 0.03;
        const threshold = 1100000;
        const result = (tc_input - threshold) * percentage;
        $('#tc_td').text(formatCurrency(result));

    } else if (tc_input > 1512501 && tc_input <= 2117500) {
        const percentage = 0.06;
        const threshold = 1512500;
        const incrementThreshold = 12375;
        const result = (tc_input - threshold) * percentage + incrementThreshold;
        $('#tc_td').text(formatCurrency(result));

    } else if (tc_input > 2117501 && tc_input <= 2722500) {
        const percentage = 0.08;
        const threshold = 2117500;
        const incrementThreshold = 48675;
        const result = (tc_input - threshold) * percentage + incrementThreshold;
        $('#tc_td').text(formatCurrency(result));

    } else if (tc_input > 2722501 && tc_input <= 12100000) {
        const percentage = 0.11;
        const threshold = 2722500;
        const incrementThreshold = 97075;
        const result = (tc_input - threshold) * percentage + incrementThreshold;
        $('#tc_td').text(formatCurrency(result));

    } else if (tc_input > 12100001) {
        const percentage = 0.13;
        const threshold = 12100000;
        const incrementThreshold = 1128600;
        const result = (tc_input - threshold) * percentage + incrementThreshold;
        $('#tc_td').text(formatCurrency(result));
    }

    // Deeds Office Fee
    const dofFees = [
        { max: 100000, fee: 45 },
        { max: 200000, fee: 101 },
        { max: 300000, fee: 642 },
        { max: 600000, fee: 800 },
        { max: 800000, fee: 1126 },
        { max: 1000000, fee: 1293 },
        { max: 2000000, fee: 1453 },
        { max: 4000000, fee: 2014 },
        { max: 6000000, fee: 2443 },
        { max: 8000000, fee: 2909 },
        { max: 10000000, fee: 3401 },
        { max: 15000000, fee: 4048 },
        { max: 20000000, fee: 4863 },
        { max: Infinity, fee: 6477 },
    ];

    let dof = 0;
    for (const fee of dofFees) {
        if (tc_input <= fee.max) {
            dof = fee.fee;
            break;
        }
    }

    const dof_value = formatCurrency(dof);
    $('#tc_dof').text(dof_value);

    // VAT
    const vat_percentage = 0.15
    const tc_ctf_value = unFormatCurrency('#tc_ctf');
    const tc_vat = 'R' + (tc_ctf_value * vat_percentage).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    $('#tc_vat').text(tc_vat);

    // Total        
    const totals_tc = ['#tc_ctf', '#tc_td', '#tc_dof', '#tc_vat'];
    const total_tc = totals_tc.reduce((total, field) => total + unFormatCurrency(field), 0);
    $('#tc_total').text(formatCurrency(total_tc));

});

// 2. Bond Costs Calculator
$('#bc_input').on('input', function () {
    const bc_input = parseFloat($(this).val());

    // Purchase Price
    if (bc_input <= 0) {
        $('#bc_la').text('0.00');
    } else {
        $('#bc_la').text(formatCurrency(bc_input));
    }

    // Conveyancing Tariff Fee
    const ctf_ranges = [
        { min: 0, max: 100000, base_fee: 6110 },
        { min: 100001, max: 150000, base_fee: 6110, increment_fee: 975, increment_treshold: 50000 },
        { min: 150001, max: 200000, base_fee: 7085, increment_fee: 975, increment_treshold: 50000 },
        { min: 200001, max: 250000, base_fee: 8060, increment_fee: 975, increment_treshold: 50000 },
        { min: 250001, max: 300000, base_fee: 9035, increment_fee: 975, increment_treshold: 50000 },
        { min: 300001, max: 350000, base_fee: 10010, increment_fee: 975, increment_treshold: 50000 },
        { min: 350001, max: 400000, base_fee: 10985, increment_fee: 975, increment_treshold: 50000 },
        { min: 400001, max: 450000, base_fee: 11960, increment_fee: 975, increment_treshold: 50000 },
        { min: 450001, max: 500000, base_fee: 12935, increment_fee: 975, increment_treshold: 50000 },
        { min: 500001, max: 600000, base_fee: 13910, increment_fee: 1885, increment_treshold: 100000 },
        { min: 600001, max: 700000, base_fee: 15795, increment_fee: 1885, increment_treshold: 100000 },
        { min: 700001, max: 800000, base_fee: 17680, increment_fee: 1885, increment_treshold: 100000 },
        { min: 800001, max: 900000, base_fee: 19565, increment_fee: 1885, increment_treshold: 100000 },
        { min: 900001, max: 1000000, base_fee: 21450, increment_fee: 1885, increment_treshold: 100000 },
        { min: 1000001, max: 1200000, base_fee: 23335, increment_fee: 1885, increment_treshold: 200000 },
        { min: 1200001, max: 1400000, base_fee: 25220, increment_fee: 1885, increment_treshold: 200000 },
        { min: 1400001, max: 1600000, base_fee: 27105, increment_fee: 1885, increment_treshold: 200000 },
        { min: 1600001, max: 1800000, base_fee: 28990, increment_fee: 1885, increment_treshold: 200000 },
        { min: 1800001, max: 2000000, base_fee: 30875, increment_fee: 1885, increment_treshold: 200000 },
        { min: 2000001, max: 2200000, base_fee: 32760, increment_fee: 1885, increment_treshold: 200000 },
        { min: 2200001, max: 2400000, base_fee: 34645, increment_fee: 1885, increment_treshold: 200000 },
        { min: 2400001, max: 2600000, base_fee: 36530, increment_fee: 1885, increment_treshold: 200000 },
        { min: 2600001, max: 2800000, base_fee: 38415, increment_fee: 1885, increment_treshold: 200000 },
        { min: 2800001, max: 3000000, base_fee: 40300, increment_fee: 1885, increment_treshold: 200000 },
        { min: 3000001, max: 3200000, base_fee: 42185, increment_fee: 1885, increment_treshold: 200000 },
        { min: 3200001, max: 3400000, base_fee: 44070, increment_fee: 1885, increment_treshold: 200000 },
        { min: 3400001, max: 3600000, base_fee: 45955, increment_fee: 1885, increment_treshold: 200000 },
        { min: 3600001, max: 3800000, base_fee: 47840, increment_fee: 1885, increment_treshold: 200000 },
        { min: 3800001, max: 4000000, base_fee: 49725, increment_fee: 1885, increment_treshold: 200000 },
        { min: 4000001, max: 4200000, base_fee: 51610, increment_fee: 1885, increment_treshold: 200000 },
        { min: 4200001, max: 4400000, base_fee: 53495, increment_fee: 1885, increment_treshold: 200000 },
        { min: 4400001, max: 4600000, base_fee: 55380, increment_fee: 1885, increment_treshold: 200000 },
        { min: 4600001, max: 4800000, base_fee: 57265, increment_fee: 1885, increment_treshold: 200000 },
        { min: 4800001, max: 5000000, base_fee: 59150, increment_fee: 1885, increment_treshold: 200000 },
        { min: 5000001, max: Infinity, base_fee: 61035, increment_fee: 4750, increment_treshold: 1000000 }
    ];

    for (const feeRange of ctf_ranges) {
        if (bc_input >= feeRange.min && bc_input <= feeRange.max) {
            if (feeRange.increment_fee) {
                const balance = Math.floor((bc_input - (feeRange.min - 1)) / feeRange.increment_treshold);

                ctf_total = balance < 1 ? feeRange.base_fee : feeRange.base_fee + (balance * feeRange.increment_fee);

            } else {
                ctf_total = feeRange.base_fee;
            }
            break;
        }
    }

    $('#bc_ctf').text(formatCurrency(ctf_total));

    // Deeds Office Fee
    const dofFees = [
        { max: 150000, fee: 496 },
        { max: 300000, fee: 642 },
        { max: 600000, fee: 800 },
        { max: 800000, fee: 1126 },
        { max: 1000000, fee: 1293 },
        { max: 2000000, fee: 1453 },
        { max: 4000000, fee: 2014 },
        { max: 6000000, fee: 2443 },
        { max: 8000000, fee: 2909 },
        { max: 10000000, fee: 3401 },
        { max: 15000000, fee: 4048 },
        { max: 20000000, fee: 4863 },
        { max: 30000000, fee: 5667 },
        { max: Infinity, fee: 8098 },
    ];

    let dof = 0;
    for (const fee of dofFees) {
        if (bc_input <= fee.max) {
            dof = fee.fee;
            break;
        }
    }
    $('#bc_dof').text(formatCurrency(dof));

    // VAT
    const vat_percentage = 0.15
    const bc_ctf_value = unFormatCurrency('#bc_ctf');
    const bc_vat = 'R' + (bc_ctf_value * vat_percentage).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    $('#bc_vat').text(bc_vat);

    // Total        
    const totals_bc = ['#bc_ctf', '#bc_dof', '#bc_vat'];
    const total_bc = totals_bc.reduce((total, field) => total + unFormatCurrency(field), 0);
    $('#bc_total').text(formatCurrency(total_bc));

});

// 3. Bond Instalments Calculator

$('#bi_la_input, #bi_ltiy_input, #bi_ir_input').on('input', function () {
    const bi_la_input = parseFloat($('#bi_la_input').val());
    const bi_ltiy_input = parseFloat($('#bi_ltiy_input').val());
    const bi_ir_input = parseFloat($('#bi_ir_input').val());

    // Loan Amount
    if (bi_la_input <= 0) {
        $('#bi_la').text('0.00');
    } else {
        $('#bi_la').text(formatCurrency(bi_la_input));
    }

    // Interest Rate
    if (bi_ir_input <= 0) {
        $('#bi_ir').text('0.00');
    } else {
        $('#bi_ir').text(formatPercentage(bi_ir_input));
    }

    // Loan Term
    if (bi_ltiy_input <= 0) {
        $('#bi_lt').text('0.00');
    } else {
        $('#bi_lt').text(formatYear(bi_ltiy_input));
    }

    // Monthly Payment            
    const bi_nper = bi_ltiy_input * 12;
    const bi_rate = bi_ir_input / 100 / 12;

    const bi_monthly_payment = (bi_la_input * bi_rate) / (1 - Math.pow(1 + bi_rate, -bi_nper));

    if (bi_la_input <= 0) {
        $('#bi_mi').text('0.00');
    } else {
        $('#bi_mi').text(formatCurrency(bi_monthly_payment));
    }

    // Total Payment            
    const bi_tp_value = bi_monthly_payment * bi_nper;
    if (bi_la_input <= 0) {
        $('#bi_tp').text('0.00');
    } else {
        $('#bi_tp').text(formatCurrency(bi_tp_value));
    }

    // Total Interest                
    const bi_ti_value = bi_tp_value - bi_la_input;
    if (bi_la_input <= 0) {
        $('#bi_ti').text('0.00');
    } else {
        $('#bi_ti').text(formatCurrency(bi_ti_value));
    }
});

// 4. Commission Calculator
const cs_vat_percentage = 0.15;
$('#cs_pp_input, #cs_cp_input').on('input', function () {
    const cs_pp_input = $('#cs_pp_input').val();
    const cs_cp_input = $('#cs_cp_input').val();

    // Property Price
    if (cs_pp_input <= 0) {
        $('#cs_pp').text('0.00');
    } else {
        $('#cs_pp').text(formatCurrency(cs_pp_input));
    }

    //Commission percentage
    if (cs_cp_input <= 0) {
        $('#cs_cp').text('0.00');
    } else {
        $('#cs_cp').text(formatPercentage(cs_cp_input));
    }

    // COMMISSION
    const cs_percentage = parseFloat(cs_cp_input) / 100;
    $('#cs_total').text(formatCurrency(cs_pp_input * cs_percentage));

    // VAT on commission
    const cs_total_value = unFormatCurrency('#cs_total');
    $('#cs_vat').text(formatCurrency(cs_total_value * cs_vat_percentage));

    // Gross Price less commission
    const cs_vat_value = unFormatCurrency('#cs_vat');
    $('#cs_gplc').text(formatCurrency(cs_pp_input - cs_total_value - cs_vat_value));

    // Gross Price plus commission            
    $('#cs_gppc').text(formatCurrency(parseFloat(cs_pp_input) + parseFloat(cs_total_value) + parseFloat(cs_vat_value)));

});

// 5. Result 

// 5A. Transfer Cost
$('#tc_input').on('input', function () {
    var elements = ['#tc_pp', '#tc_ctf', '#tc_td', '#tc_dof', '#tc_vat', '#tc_total'];
    elements.forEach(function (element) {
        $(`#result_${element.substring(1)}`).val($(element).text());
    });
});

// 5B. Bond Cost
$('#bc_input').on('input', function () {
    var elements = ['#bc_la', '#bc_ctf', '#bc_dof', '#bc_vat', '#bc_total'];
    elements.forEach(function (element) {
        $(`#result_${element.substring(1)}`).val($(element).text());
    });
});

// 5c. Bond Instalments
$('#bi_la_input, #bi_ltiy_input, #bi_ir_input').on('input', function () {
    var elements = ['#bi_la', '#bi_ir', '#bi_lt', '#bi_tp', '#bi_ti', '#bi_mi'];
    elements.forEach(function (element) {
        $(`#result_${element.substring(1)}`).val($(element).text());
    });
});

// 5d. Commission
$('#cs_pp_input, #cs_cp_input').on('input', function () {
    var elements = ['#cs_pp', '#cs_cp', '#cs_vat', '#cs_gplc', '#cs_total', '#cs_gppc'];
    elements.forEach(function (element) {
        $(`#result_${element.substring(1)}`).val($(element).text());
    });
});


