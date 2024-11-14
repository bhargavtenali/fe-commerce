import React, { useState } from "react";
import { FaChevronDown, FaChevronRight, FaEdit } from "react-icons/fa";
import EditableField from "./EditableField";

function ProductItem({ product, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [expandedVariants, setExpandedVariants] = useState({});

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleToggleVariant = (variantId) => {
    setExpandedVariants((prev) => ({
      ...prev,
      [variantId]: !prev[variantId],
    }));
  };

  const handleUpdate = (field, value) => {
    const updatedProduct = { ...product, [field]: value };
    onUpdate(updatedProduct);
  };

  const handleVariantUpdate = (variantId, field, value) => {
    const updatedVariants = product.primaryVariants.map((variant) =>
      variant.id === variantId ? { ...variant, [field]: value } : variant
    );
    const updatedProduct = { ...product, primaryVariants: updatedVariants };
    onUpdate(updatedProduct);
  };

  const handleSecondaryVariantUpdate = (
    primaryId,
    secondaryId,
    field,
    value
  ) => {
    const updatedPrimaryVariants = product.primaryVariants.map((primary) => {
      if (primary.id === primaryId) {
        const updatedSecondaryVariants = primary.secondaryVariants.map(
          (secondary) =>
            secondary.id === secondaryId
              ? { ...secondary, [field]: value }
              : secondary
        );
        return { ...primary, secondaryVariants: updatedSecondaryVariants };
      }
      return primary;
    });
    const updatedProduct = {
      ...product,
      primaryVariants: updatedPrimaryVariants,
    };
    onUpdate(updatedProduct);
  };

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <span className="font-medium">{product.title}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          {product.primaryVariants.map((variant) => (
            <span
              key={variant.id}
              className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs mr-1"
            >
              {variant.name}
            </span>
          ))}
        </td>
        <td className="py-3 px-6 text-center">
          <EditableField
            value={product.price}
            onUpdate={(value) => handleUpdate("price", parseFloat(value))}
          />
        </td>
        <td className="py-3 px-6 text-center">
          <EditableField
            value={product.inventory}
            onUpdate={(value) => handleUpdate("inventory", parseInt(value))}
          />
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <button
              onClick={handleToggleExpand}
              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
            >
              {expanded ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {/* <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
              <FaEdit />
            </button> */}
          </div>
        </td>
      </tr>
      {expanded &&
        product.primaryVariants.map((variant) => (
          <React.Fragment key={variant.id}>
            <tr className="bg-gray-50">
              <td className="py-2 px-6 text-left">
                <div className="flex items-center ml-4">
                  <span>{variant.name}</span>
                </div>
              </td>
              <td className="py-2 px-6 text-left">
                {variant.secondaryVariants.map((secondary) => (
                  <span
                    key={secondary.id}
                    className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs mr-1"
                  >
                    {secondary.name}
                  </span>
                ))}
              </td>
              <td className="py-2 px-6 text-center">
                <EditableField
                  value={variant.price}
                  onUpdate={(value) =>
                    handleVariantUpdate(variant.id, "price", parseFloat(value))
                  }
                />
              </td>
              <td className="py-2 px-6 text-center">
                <EditableField
                  value={variant.inventory}
                  onUpdate={(value) =>
                    handleVariantUpdate(
                      variant.id,
                      "inventory",
                      parseInt(value)
                    )
                  }
                />
              </td>
              <td className="py-2 px-6 text-center">
                <div className="flex item-center justify-center">
                  {/* <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                    <FaEdit />
                  </button> */}
                  <button
                    onClick={() => handleToggleVariant(variant.id)}
                    className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                  >
                    {expandedVariants[variant.id] ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronRight />
                    )}
                  </button>
                </div>
              </td>
            </tr>
            {expandedVariants[variant.id] &&
              variant.secondaryVariants.map((secondary) => (
                <tr key={secondary.id} className="bg-gray-100">
                  <td className="py-2 px-6 text-left">
                    <div className="flex items-center ml-8">
                      <span>{secondary.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-6 text-left"></td>
                  <td className="py-2 px-6 text-center">
                    <EditableField
                      value={secondary.price}
                      onUpdate={(value) =>
                        handleSecondaryVariantUpdate(
                          variant.id,
                          secondary.id,
                          "price",
                          parseFloat(value)
                        )
                      }
                    />
                  </td>
                  <td className="py-2 px-6 text-center">
                    <EditableField
                      value={secondary.inventory}
                      onUpdate={(value) =>
                        handleSecondaryVariantUpdate(
                          variant.id,
                          secondary.id,
                          "inventory",
                          parseInt(value)
                        )
                      }
                    />
                  </td>
                  <td className="py-2 px-6 text-center">
                    <div className="flex item-center justify-center">
                      {/* <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <FaEdit />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
          </React.Fragment>
        ))}
    </>
  );
}

export default ProductItem;
