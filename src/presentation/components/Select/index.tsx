import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Context from '@/presentation/hooks/form';

import Styles from './styles.scss';

interface IOptions {
  label: string;
  value: number;
}
interface ISelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  title?: string;
  options: Array<IOptions>;
}

const Select: React.FC<ISelectProps> = (props: ISelectProps) => {
  const { state, setState } = useContext(Context);
  const [selectedOptionsId, setSelectedOptionsId] = useState<number[]>([]);

  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleContainerClick = (): void => {
    setShowOptions(!showOptions);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  const handleOptionChange = useCallback(
    (option): void => {
      const optionValue = option?.value;
      const isSelected = selectedOptionsId.includes(optionValue);
      const updatedSelectedOptionsId = isSelected
        ? selectedOptionsId.filter((item) => item !== optionValue)
        : [...selectedOptionsId, optionValue];

      setSelectedOptionsId(updatedSelectedOptionsId);
      setState({ ...state, [props.name]: updatedSelectedOptionsId });
    },
    [selectedOptionsId, state, props.name]
  );

  return (
    <div className={Styles.MultiSelectContainer} ref={containerRef}>
      <div
        className={showOptions ? Styles.selectBoxOpen : Styles.selectBox}
        data-testid="selectField"
        onClick={handleContainerClick}
      >
        <span>{props?.title}</span>
      </div>
      {showOptions && (
        <div className={Styles.Options}>
          {props?.options.map((option, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={option?.value}
                checked={selectedOptionsId?.includes(option?.value)}
                onChange={() => handleOptionChange(option)}
              />
              {option?.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
