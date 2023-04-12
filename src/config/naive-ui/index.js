import index from '@/config/vue/index.ts';
/*import _internal from 'naive-ui/es/_internal/index';
 import _mixins from 'naive-ui/es/_mixins/index';
 import _styles from 'naive-ui/es/_styles/';
 import _utils from 'naive-ui/es/_utils/index';*/
import { NAffix } from 'naive-ui/es/affix/index';
import { NAlert } from 'naive-ui/es/alert/index';
import { NAnchor } from 'naive-ui/es/anchor/index';
import { NAutoComplete } from 'naive-ui/es/auto-complete/index';
import { NAvatar } from 'naive-ui/es/avatar/index';
import { NAvatarGroup } from 'naive-ui/es/avatar-group/index';
import { NBackTop } from 'naive-ui/es/back-top/index';
import { NBadge } from 'naive-ui/es/badge/index';
import { NBreadcrumb } from 'naive-ui/es/breadcrumb/index';
import { NButton } from 'naive-ui/es/button/index';
import { NButtonGroup } from 'naive-ui/es/button-group/index';
import { NCalendar } from 'naive-ui/es/calendar/index';
import { NCard } from 'naive-ui/es/card/index';
import { NCarousel } from 'naive-ui/es/carousel/index';
import { NCascader } from 'naive-ui/es/cascader/index';
import { NCheckbox } from 'naive-ui/es/checkbox/index';
import { NCode } from 'naive-ui/es/code/index';
import { NCollapse } from 'naive-ui/es/collapse/index';
import { NCollapseTransition } from 'naive-ui/es/collapse-transition/index';
import { NColorPicker } from 'naive-ui/es/color-picker/index';
/*import { useThemeVars } from 'naive-ui/es/composables/index';*/
import { NConfigProvider } from 'naive-ui/es/config-provider/index';
import { NCountdown } from 'naive-ui/es/countdown/index';
/*import NDataTable from 'naive-ui/es/data-table/index';*/
import { NDatePicker } from 'naive-ui/es/date-picker/index';
import { NDescriptions } from 'naive-ui/es/descriptions/index';
/*import NDialog from 'naive-ui/es/dialog/index';*/
/*import { createDiscreteApi } from 'naive-ui/es/discrete/index';*/
import { NDivider } from 'naive-ui/es/divider/index';
import { NDrawer } from 'naive-ui/es/drawer/index';
import { NDropdown } from 'naive-ui/es/dropdown/index';
import { NDynamicInput } from 'naive-ui/es/dynamic-input/index';
import { NDynamicTags } from 'naive-ui/es/dynamic-tags/index';
import { NElement } from 'naive-ui/es/element/index';
import { NEllipsis } from 'naive-ui/es/ellipsis/index';
import { NEmpty } from 'naive-ui/es/empty/index';
import { NEquation } from 'naive-ui/es/equation/index';
import {
	NForm, NFormItem, NFormItemGridItem, NFormItemCol, NFormItemRow,
	formProps, formItemProps,
	formItemGridItemProps
} from 'naive-ui/es/form/index';
import { NGlobalStyle } from 'naive-ui/es/global-style/index';
import { NGradientText } from 'naive-ui/es/gradient-text/index';
import { NGrid, NGridItem, NGi } from 'naive-ui/es/grid/index';
import { NIcon } from 'naive-ui/es/icon/index';
import { NIconWrapper } from 'naive-ui/es/icon-wrapper/index';
import { NImage } from 'naive-ui/es/image/index';
import { NInput } from 'naive-ui/es/input/index';
import { NInputNumber } from 'naive-ui/es/input-number/index';
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter, NLayoutSider } from 'naive-ui/es/layout/index';
/*import { NCol, NRow } from 'naive-ui/es/legacy-grid/index';*/
/*import { NLegacyTransfer } from 'naive-ui/es/legacy-transfer/index';*/
import { NList } from 'naive-ui/es/list/index';
import { NLoadingBarProvider } from 'naive-ui/es/loading-bar/index';
import { dateZhCN, zhCN } from 'naive-ui/es/locales/index';
import { NLog } from 'naive-ui/es/log/index';
import { NMention } from 'naive-ui/es/mention/index';
import { NMenu, menuProps } from 'naive-ui/es/menu/index';
import { NMessageProvider } from 'naive-ui/es/message/index';
/*import { NModal } from 'naive-ui/es/modal/index';*/
import { NNotificationProvider } from 'naive-ui/es/notification/index';
import { NNumberAnimation } from 'naive-ui/es/number-animation/index';
import { NPageHeader } from 'naive-ui/es/page-header/index';
/*import { NPagination } from 'naive-ui/es/pagination/index';*/
import { NPopconfirm } from 'naive-ui/es/popconfirm/index';
import { NPopover } from 'naive-ui/es/popover/index';
import { NPopselect } from 'naive-ui/es/popselect/index';
import { NProgress } from 'naive-ui/es/progress/index';
import { NRadio } from 'naive-ui/es/radio/index';
import { NRate } from 'naive-ui/es/rate/index';
import { NResult } from 'naive-ui/es/result/index';
import { NScrollbar } from 'naive-ui/es/scrollbar/index';
import { NSelect } from 'naive-ui/es/select/index';
import { NSkeleton } from 'naive-ui/es/skeleton/index';
import { NSlider } from 'naive-ui/es/slider/index';
import { NSpace } from 'naive-ui/es/space/index';
import { NSpin } from 'naive-ui/es/spin/index';
import { NStatistic } from 'naive-ui/es/statistic/index';
import { NSteps } from 'naive-ui/es/steps/index';
import { NSwitch } from 'naive-ui/es/switch/index';
/*import { NTable } from 'naive-ui/es/table/index';*/
import { NTab, NTabs, NTabPane } from 'naive-ui/es/tabs/index';
import { NTag } from 'naive-ui/es/tag/index';
import { NThemeEditor } from 'naive-ui/es/theme-editor/index';
/*import NThemes from 'naive-ui/es/themes/index';*/
import { NThing } from 'naive-ui/es/thing/index';
import { NTime } from 'naive-ui/es/time/index';
import { NTimePicker } from 'naive-ui/es/time-picker/index';
import { NTimeline } from 'naive-ui/es/timeline/index';
import { NTooltip } from 'naive-ui/es/tooltip/index';
import { NTransfer } from 'naive-ui/es/transfer/index';
import { NTree } from 'naive-ui/es/tree/index';
import { NTreeSelect } from 'naive-ui/es/tree-select/index';
/*import { NTypography } from 'naive-ui/es/typography/index';*/
/*import NUpload from 'naive-ui/es/upload/index';*/
import { NWatermark } from 'naive-ui/es/watermark/index';
import { createTheme, darkTheme, lightTheme } from 'naive-ui/es/themes/index';
index.vue.component('n-affix', NAffix);
index.vue.component('n-alert', NAlert);
index.vue.component('n-anchor', NAnchor);
index.vue.component('n-auto-complete', NAutoComplete);
index.vue.component('n-avatar', NAvatar);
index.vue.component('n-avatar-group', NAvatarGroup);
index.vue.component('n-back-top', NBackTop);
index.vue.component('n-badge', NBadge);
index.vue.component('n-breadcrumb', NBreadcrumb);
index.vue.component('n-button', NButton);
index.vue.component('n-button-group', NButtonGroup);
index.vue.component('n-calendar', NCalendar);
index.vue.component('n-card', NCard);
index.vue.component('n-carousel', NCarousel);
index.vue.component('n-cascader', NCascader);
index.vue.component('n-checkbox', NCheckbox);
index.vue.component('n-code', NCode);
index.vue.component('n-collapse', NCollapse);
index.vue.component('n-collapse-transition', NCollapseTransition);
index.vue.component('n-color-picker', NColorPicker);
index.vue.component('n-config-provider', NConfigProvider);
index.vue.component('n-countdown', NCountdown);
index.vue.component('n-date-picker', NDatePicker);
index.vue.component('n-descriptions', NDescriptions);
index.vue.component('n-divider', NDivider);
index.vue.component('n-drawer', NDrawer);
index.vue.component('n-dropdown', NDropdown);
index.vue.component('n-dynamic-input', NDynamicInput);
index.vue.component('n-dynamic-tags', NDynamicTags);
index.vue.component('n-element', NElement);
index.vue.component('n-ellipsis', NEllipsis);
index.vue.component('n-empty', NEmpty);
index.vue.component('n-equation', NEquation);
index.vue.component('n-form', NForm);
index.vue.component('n-form-item', NFormItem);
index.vue.component('n-form-item-grid-item', NFormItemGridItem);
index.vue.component('n-form-item-col', NFormItemCol);
index.vue.component('n-form-item-row', NFormItemRow);
index.vue.component('n-global-style', NGlobalStyle);
index.vue.component('n-gradient-text', NGradientText);
index.vue.component('n-grid', NGrid);
index.vue.component('n-grid-item', NGridItem);
index.vue.component('n-gi', NGi);
index.vue.component('n-icon', NIcon);
index.vue.component('n-icon-wrapper', NIconWrapper);
index.vue.component('n-image', NImage);
index.vue.component('n-input', NInput);
index.vue.component('n-input-number', NInputNumber);
index.vue.component('n-layout', NLayout);
index.vue.component('n-layout-content', NLayoutContent);
index.vue.component('n-layout-header', NLayoutHeader);
index.vue.component('n-layout-footer', NLayoutFooter);
index.vue.component('n-layout-sider', NLayoutSider);
/*index.vue.component('n-row', NRow);
index.vue.component('n-col', NCol);*/
/*index.vue.component('n-legacy-transfer', NLegacyTransfer);*/
index.vue.component('n-list', NList);
index.vue.component('n-loading-bar-provider', NLoadingBarProvider);
index.vue.component('n-log', NLog);
index.vue.component('n-mention', NMention);
index.vue.component('n-menu', NMenu);
index.vue.component('n-message-provider', NMessageProvider);
/*index.vue.component('n-modal', NModal);*/
index.vue.component('n-notification-provider', NNotificationProvider);
index.vue.component('n-number-animation', NNumberAnimation);
index.vue.component('n-page-header', NPageHeader);
/*index.vue.component('n-pagination', NPagination);*/
index.vue.component('n-popconfirm', NPopconfirm);
index.vue.component('n-popover', NPopover);
index.vue.component('n-popselect', NPopselect);
index.vue.component('n-progress', NProgress);
index.vue.component('n-radio', NRadio);
index.vue.component('n-rate', NRate);
index.vue.component('n-result', NResult);
index.vue.component('n-scrollbar', NScrollbar);
index.vue.component('n-select', NSelect);
index.vue.component('n-skeleton', NSkeleton);
index.vue.component('n-slider', NSlider);
index.vue.component('n-space', NSpace);
index.vue.component('n-spin', NSpin);
index.vue.component('n-statistic', NStatistic);
index.vue.component('n-steps', NSteps);
index.vue.component('n-switch', NSwitch);
/*index.vue.component('n-table', NTable);*/
index.vue.component('n-tab', NTab);
index.vue.component('n-tabs', NTabs);
index.vue.component('n-tab-pane', NTabPane);
index.vue.component('n-tag', NTag);
index.vue.component('n-theme-editor', NThemeEditor);
index.vue.component('n-thing', NThing);
index.vue.component('n-time', NTime);
index.vue.component('n-time-picker', NTimePicker);
index.vue.component('n-timeline', NTimeline);
index.vue.component('n-tooltip', NTooltip);
index.vue.component('n-transfer', NTransfer);
index.vue.component('n-tree', NTree);
index.vue.component('n-tree-select', NTreeSelect);
index.vue.component('n-watermark', NWatermark);
export {
	darkTheme, lightTheme, createTheme,
	zhCN, dateZhCN,
	/*类型*/
	menuProps,
	formProps, formItemProps,
	formItemGridItemProps
};