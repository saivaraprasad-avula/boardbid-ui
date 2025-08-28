import React from 'react';

/**
 * Displays a user's avatar and full name.
 * Expects a user object with optional `image_url`, `full_name`, `email`, `first_name`, `last_name`, `user_id` fields.
 *
 * @param {object} props
 * @param {object} props.user - The user data.
 * @param {string} [props.size="sm"] - Avatar size: "xs", "sm", "md", or "lg".
 * @param {string} [props.className] - Additional classes for the container.
 * @param {string} [props.textClass] - Additional classes for the text element.
 */
export default function UserAvatarName({ user, size = 'sm', className = '', textClass = '' }) {
  if (!user) return null;

  const src = user.image_url || user.imageUrl || null;
  const name =
    user.full_name ||
    user.fullName ||
    [user.first_name || user.firstName, user.last_name || user.lastName].filter(Boolean).join(' ') ||
    user.email ||
    user.user_id ||
    user.id ||
    '';

  const sizes = {
    xs: 'h-4 w-4',
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };
  const avatarCls = sizes[size] || sizes.sm;

  return (
    <div className={`flex items-center ${className}`}>
      {src ? <img src={src} alt={name || 'avatar'} className={`${avatarCls} rounded-full mr-2`} /> : null}
      <span className={`truncate ${textClass}`}>{name}</span>
    </div>
  );
}
