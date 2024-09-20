module.exports = {
    extends: [
      'stylelint-config-standard',
    ],

    rules: {
      'at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: [
            'tailwind',
            'apply',
            'variants',
            'responsive',
            'screen',
          ],
        },
      ],
      'color-function-notation': null,
      'custom-property-empty-line-before': null,
      'selector-type-no-unknown': null,
      'alpha-value-notation': null,
      'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
      
      // 自定义class命名规则
      'selector-class-pattern': [
        '^([a-z][a-z0-9]*)((-|__)[a-z0-9]+)*$',
        {
          message: 'Expected class selector to be kebab-case、kebab__case',
        },
      ],
    },
  };