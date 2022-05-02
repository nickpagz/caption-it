/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	InnerBlocks,
	useBlockProps,
	ColorPalette,
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';
import { Placeholder, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

const MY_TEMPLATE = [['core/image', {}]];

export default function Edit({ attributes, isSelected, setAttributes }) {
	const onChangeBGColor = (hexColor) => {
		setAttributes({ bg_color: hexColor });
	};

	const onChangeTextColor = (hexColor) => {
		setAttributes({ text_color: hexColor });
	};

	const onChangeAlignment = (newAlignment) => {
		setAttributes({
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		});
	};

	return (
		<div
			{...useBlockProps({
				style: {
					backgroundColor: attributes.bg_color,
					color: attributes.text_color,
					textAlign: attributes.alignment,
				},
			})}
		>
			<BlockControls>
				<AlignmentToolbar
					value={attributes.alignment}
					onChange={onChangeAlignment}
				/>
			</BlockControls>
			<InspectorControls>
				<div id="caption-it-controls">
					<fieldset>
						<legend className="blocks-base-control__label">
							{__('Background color', 'caption-it')}
						</legend>
						<ColorPalette onChange={onChangeBGColor} />
					</fieldset>
					<fieldset>
						<legend className="blocks-base-control__label">
							{__('Text color', 'caption-it')}
						</legend>
						<ColorPalette onChange={onChangeTextColor} />
					</fieldset>
				</div>
			</InspectorControls>
			{attributes.message && !isSelected ? (
				<p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="48"
						height="48"
						fill="currentColor"
						className="bi bi-quote"
						viewBox="0 0 16 16"
					>
						<path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
					</svg>
					{attributes.message}
				</p>
			) : (
				<Placeholder
					label="Caption It!"
					instructions="Add your caption"
				>
					<TextControl
						value={attributes.message}
						onChange={(val) => setAttributes({ message: val })}
					/>
				</Placeholder>
			)}

			<InnerBlocks template={MY_TEMPLATE} />
		</div>
	);
}
