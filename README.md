# 🌳 Tree View

Использовал Create React App + Storybook, чтобы не возиться со сборкой

## Props

| Prop name                                            	| Description                                                                                                                                          	| Type                                       	| Default     	|
|------------------------------------------------------	|------------------------------------------------------------------------------------------------------------------------------------------------------	|--------------------------------------------	|-------------	|
| **nodes<span style="color:#ff4400">*</span>**        	| Структура дерева                                                                                                                                     	| `TreeNodeProps[]`                          	|             	|
| **multiSelect**                                      	| Включить множественный выбор                                                                                                                         	| `boolean`                                  	| `false`     	|
| **expanded<span style="color:#ff4400">*</span>**     	| Список id раскрытых элементов                                                                                                                        	| `string[]`                                 	|             	|
| **selected<span style="color:#ff4400">*</span>**     	| Список id выбранных элементов                                                                                                                        	| `string[] \| string`                       	|             	|
| **expandIcon<span style="color:#ff4400">*</span>**   	| Иконка для нераскрытого элемента                                                                                                                     	| `ReactNode`                                	|             	|
| **collapseIcon<span style="color:#ff4400">*</span>** 	| Иконка для раскрытого элемента                                                                                                                       	| `ReactNode`                                	|             	|
| **LabelComponent**                                   	| Компонент для переопределения рендера лейбла<br>[Пример](https://github.com/ishindanil/Tree-View/blob/master/src/components/TreeLabel/TreeLabel.tsx) 	| `ComponentType<LabelComponentProps>`       	|             	|
| **onToggle**                                         	| Обработчик открытия/закрытия parent-узла дерева                                                                                                      	| `((expanded: string[]) => void)`           	| `undefined` 	|
| **onSelect**                                         	| Обработчик выбора узла дерева                                                                                                                        	| `((selected: string \| string[]) => void)` 	| `undefined` 	|

## [Тут можно посмотреть демо](https://6249d6fec2e1d3003a844c5a-lcasfnkhyc.chromatic.com/?path=/story/treeview--playground)


## Соблюдены рекомендации WAI для Tree View

https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView

## Как запустить у себя

-   Клонируем репозиторий
-   `npm install`
-   `npm run storybook`
