-- ============================================================
--  GLAM STORE — Supabase PostgreSQL Schema
--  Run this entire file in Supabase SQL Editor
-- ============================================================

-- Required extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- 1. PROFILES  (extends Supabase built-in auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL UNIQUE,
  mobile      VARCHAR(10),
  gender      TEXT        CHECK (gender IN ('male', 'female', 'other')),
  dob         DATE,
  avatar      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.profiles IS 'Extended user profile data linked to auth.users';


-- ============================================================
-- 2. CATEGORIES  (supports nested parent → child hierarchy)
-- ============================================================
CREATE TABLE public.categories (
  id          TEXT        PRIMARY KEY,
  label       TEXT        NOT NULL,
  slug        TEXT        NOT NULL UNIQUE,
  icon        TEXT,
  parent_id   TEXT        REFERENCES public.categories(id) ON DELETE SET NULL,
  banner      TEXT,
  description TEXT,
  keywords    TEXT,
  sort_order  INT         DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 3. BRANDS
-- ============================================================
CREATE TABLE public.brands (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT        NOT NULL,
  logo        TEXT,
  color       TEXT,
  slug        TEXT        UNIQUE,
  href        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 4. PRODUCTS
-- ============================================================
CREATE TABLE public.products (
  id            TEXT           PRIMARY KEY,
  name          TEXT           NOT NULL,
  brand         TEXT           NOT NULL,
  brand_color   TEXT,
  price         DECIMAL(10,2)  NOT NULL CHECK (price > 0),
  mrp           DECIMAL(10,2)  NOT NULL CHECK (mrp >= price),
  discount      INT            NOT NULL DEFAULT 0 CHECK (discount BETWEEN 0 AND 100),
  badge_bg      TEXT,
  rating        DECIMAL(2,1)   DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  reviews       TEXT,                      -- stored as display string e.g. "8.2k"
  img           TEXT,
  category_id   TEXT           REFERENCES public.categories(id) ON DELETE SET NULL,
  is_deal       BOOLEAN        DEFAULT FALSE,
  is_new_launch BOOLEAN        DEFAULT FALSE,
  in_stock      BOOLEAN        DEFAULT TRUE,
  description   TEXT,
  created_at    TIMESTAMPTZ    DEFAULT NOW(),
  updated_at    TIMESTAMPTZ    DEFAULT NOW()
);


-- ============================================================
-- 5. ADDRESSES
-- ============================================================
CREATE TABLE public.addresses (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type        TEXT        NOT NULL DEFAULT 'home' CHECK (type IN ('home', 'work', 'other')),
  name        TEXT        NOT NULL,
  mobile      VARCHAR(10) NOT NULL,
  line1       TEXT        NOT NULL,
  line2       TEXT,
  city        TEXT        NOT NULL,
  state       TEXT        NOT NULL,
  pincode     VARCHAR(6)  NOT NULL,
  is_default  BOOLEAN     DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 6. ORDERS
-- ============================================================
CREATE TABLE public.orders (
  id              TEXT           PRIMARY KEY,  -- e.g. GS4K9X2M
  user_id         UUID           REFERENCES public.profiles(id) ON DELETE SET NULL,
  status          TEXT           NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','processing','shipped','delivered','cancelled','returned')),
  total           DECIMAL(10,2)  NOT NULL CHECK (total >= 0),
  discount_amount DECIMAL(10,2)  DEFAULT 0,
  address_id      UUID           REFERENCES public.addresses(id) ON DELETE SET NULL,
  payment_method  TEXT,          -- 'card' | 'upi' | 'cod'
  coupon_code     TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ    DEFAULT NOW(),
  updated_at      TIMESTAMPTZ    DEFAULT NOW()
);


-- ============================================================
-- 7. ORDER ITEMS
-- ============================================================
CREATE TABLE public.order_items (
  id            UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      TEXT           NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id    TEXT           REFERENCES public.products(id) ON DELETE SET NULL,
  product_name  TEXT           NOT NULL,
  product_img   TEXT,
  brand         TEXT,
  quantity      INT            NOT NULL DEFAULT 1 CHECK (quantity > 0),
  price         DECIMAL(10,2)  NOT NULL,
  mrp           DECIMAL(10,2),
  created_at    TIMESTAMPTZ    DEFAULT NOW()
);


-- ============================================================
-- 8. WISHLIST
-- ============================================================
CREATE TABLE public.wishlists (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id  TEXT        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);


-- ============================================================
-- 9. CART ITEMS
-- ============================================================
CREATE TABLE public.cart_items (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id  TEXT        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity    INT         NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);


-- ============================================================
-- 10. SAVED CARDS  (payment methods)
-- ============================================================
CREATE TABLE public.saved_cards (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  last4            VARCHAR(4)  NOT NULL,
  brand            TEXT        NOT NULL CHECK (brand IN ('VISA','MASTERCARD','AMEX','RUPAY')),
  expiry           VARCHAR(5)  NOT NULL,   -- MM/YY
  cardholder_name  TEXT        NOT NULL,
  is_default       BOOLEAN     DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 11. UPI IDs  (payment methods)
-- ============================================================
CREATE TABLE public.upi_ids (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  upi_id      TEXT        NOT NULL,
  provider    TEXT,
  is_default  BOOLEAN     DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, upi_id)
);


-- ============================================================
-- 12. NOTIFICATION PREFERENCES
-- ============================================================
CREATE TABLE public.notification_preferences (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID        NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_updates    BOOLEAN     DEFAULT TRUE,
  offers           BOOLEAN     DEFAULT TRUE,
  new_launches     BOOLEAN     DEFAULT TRUE,
  wishlist_alerts  BOOLEAN     DEFAULT TRUE,
  beauty_tips      BOOLEAN     DEFAULT TRUE,
  points           BOOLEAN     DEFAULT TRUE,
  sms              BOOLEAN     DEFAULT TRUE,
  whatsapp         BOOLEAN     DEFAULT TRUE,
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 13. GLAMOUR POINTS  (loyalty program)
-- ============================================================
CREATE TABLE public.glamour_points (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID        NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  points      INT         NOT NULL DEFAULT 0 CHECK (points >= 0),
  tier        TEXT        NOT NULL DEFAULT 'silver' CHECK (tier IN ('silver','gold','platinum')),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.points_history (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  points       INT         NOT NULL,
  type         TEXT        NOT NULL CHECK (type IN ('earned','redeemed','expired')),
  description  TEXT,
  order_id     TEXT        REFERENCES public.orders(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 14. REVIEWS & RATINGS
-- ============================================================
CREATE TABLE public.reviews (
  id                    UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID        REFERENCES public.profiles(id) ON DELETE SET NULL,
  product_id            TEXT        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  rating                INT         NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title                 TEXT,
  body                  TEXT,
  images                TEXT[],
  is_verified_purchase  BOOLEAN     DEFAULT FALSE,
  helpful_count         INT         DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);


-- ============================================================
-- 15. COUPONS
-- ============================================================
CREATE TABLE public.coupons (
  id              UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
  code            TEXT           NOT NULL UNIQUE,
  title           TEXT           NOT NULL,
  description     TEXT,
  discount_type   TEXT           NOT NULL CHECK (discount_type IN ('percent','flat')),
  discount_value  DECIMAL(10,2)  NOT NULL CHECK (discount_value > 0),
  min_order       DECIMAL(10,2)  DEFAULT 0,
  max_discount    DECIMAL(10,2),
  valid_from      TIMESTAMPTZ    DEFAULT NOW(),
  valid_until     TIMESTAMPTZ,
  usage_limit     INT,
  used_count      INT            DEFAULT 0,
  is_active       BOOLEAN        DEFAULT TRUE,
  created_at      TIMESTAMPTZ    DEFAULT NOW()
);

CREATE TABLE public.coupon_usage (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  coupon_id   UUID        NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id    TEXT        REFERENCES public.orders(id) ON DELETE SET NULL,
  used_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (coupon_id, user_id)
);


-- ============================================================
-- 16. BLOG POSTS
-- ============================================================
CREATE TABLE public.blog_posts (
  id          TEXT        PRIMARY KEY,
  title       TEXT        NOT NULL,
  slug        TEXT        NOT NULL UNIQUE,
  tag         TEXT,
  tag_bg      TEXT,
  tag_color   TEXT,
  read_time   TEXT,
  img         TEXT,
  body        TEXT,
  published   BOOLEAN     DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 17. PROMO BANNERS
-- ============================================================
CREATE TABLE public.promo_banners (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT        NOT NULL,
  sub         TEXT,
  href        TEXT,
  img         TEXT,
  sort_order  INT         DEFAULT 0,
  is_active   BOOLEAN     DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 18. SEARCH HISTORY
-- ============================================================
CREATE TABLE public.search_history (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  query       TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_products_category     ON public.products(category_id);
CREATE INDEX idx_products_brand        ON public.products(brand);
CREATE INDEX idx_products_is_deal      ON public.products(is_deal)       WHERE is_deal = TRUE;
CREATE INDEX idx_products_is_new       ON public.products(is_new_launch) WHERE is_new_launch = TRUE;
CREATE INDEX idx_products_in_stock     ON public.products(in_stock)      WHERE in_stock = TRUE;
CREATE INDEX idx_orders_user           ON public.orders(user_id);
CREATE INDEX idx_orders_status         ON public.orders(status);
CREATE INDEX idx_order_items_order     ON public.order_items(order_id);
CREATE INDEX idx_wishlist_user         ON public.wishlists(user_id);
CREATE INDEX idx_cart_user             ON public.cart_items(user_id);
CREATE INDEX idx_addresses_user        ON public.addresses(user_id);
CREATE INDEX idx_reviews_product       ON public.reviews(product_id);
CREATE INDEX idx_reviews_user          ON public.reviews(user_id);
CREATE INDEX idx_search_user           ON public.search_history(user_id);
CREATE INDEX idx_points_history_user   ON public.points_history(user_id);
CREATE INDEX idx_categories_parent     ON public.categories(parent_id);
CREATE INDEX idx_categories_slug       ON public.categories(slug);


-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at    BEFORE UPDATE ON public.profiles    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_products_updated_at    BEFORE UPDATE ON public.products    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_orders_updated_at      BEFORE UPDATE ON public.orders      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_addresses_updated_at   BEFORE UPDATE ON public.addresses   FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_cart_updated_at        BEFORE UPDATE ON public.cart_items  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_reviews_updated_at     BEFORE UPDATE ON public.reviews     FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_blog_updated_at        BEFORE UPDATE ON public.blog_posts  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- Auto-create profile + points row + notification prefs on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  ) ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.glamour_points (user_id, points, tier)
  VALUES (NEW.id, 0, 'silver') ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id) ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- Ensure only one default address per user
CREATE OR REPLACE FUNCTION public.single_default_address()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.is_default THEN
    UPDATE public.addresses
    SET is_default = FALSE
    WHERE user_id = NEW.user_id AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_single_default_address
  AFTER INSERT OR UPDATE ON public.addresses
  FOR EACH ROW WHEN (NEW.is_default = TRUE)
  EXECUTE FUNCTION public.single_default_address();


-- Ensure only one default card per user
CREATE OR REPLACE FUNCTION public.single_default_card()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.is_default THEN
    UPDATE public.saved_cards
    SET is_default = FALSE
    WHERE user_id = NEW.user_id AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_single_default_card
  AFTER INSERT OR UPDATE ON public.saved_cards
  FOR EACH ROW WHEN (NEW.is_default = TRUE)
  EXECUTE FUNCTION public.single_default_card();


-- Auto-award Glamour Points when order status becomes 'delivered'
-- Rule: 1 point per ₹100 spent. Tier upgrades: 1000 pts = Gold, 5000 pts = Platinum
CREATE OR REPLACE FUNCTION public.award_points_on_delivery()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_pts INT;
BEGIN
  IF NEW.status = 'delivered' AND OLD.status != 'delivered' AND NEW.user_id IS NOT NULL THEN
    v_pts := GREATEST(1, FLOOR(NEW.total / 100)::INT);

    UPDATE public.glamour_points
    SET points     = points + v_pts,
        tier       = CASE
                       WHEN points + v_pts >= 5000 THEN 'platinum'
                       WHEN points + v_pts >= 1000 THEN 'gold'
                       ELSE 'silver'
                     END,
        updated_at = NOW()
    WHERE user_id = NEW.user_id;

    INSERT INTO public.points_history (user_id, points, type, description, order_id)
    VALUES (NEW.user_id, v_pts, 'earned', 'Order delivered — ' || NEW.id, NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_award_points
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.award_points_on_delivery();


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS
ALTER TABLE public.profiles                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_cards               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upi_ids                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glamour_points            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_history            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_banners             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons                   ENABLE ROW LEVEL SECURITY;

-- ── Profiles ──────────────────────────────────────────────
CREATE POLICY "profile_select_own"   ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profile_insert_own"   ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profile_update_own"   ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ── Addresses ─────────────────────────────────────────────
CREATE POLICY "address_all_own"      ON public.addresses FOR ALL USING (auth.uid() = user_id);

-- ── Orders ────────────────────────────────────────────────
CREATE POLICY "order_select_own"     ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "order_insert_own"     ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ── Order Items ───────────────────────────────────────────
CREATE POLICY "order_item_select_own" ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  )
);

-- ── Wishlist ──────────────────────────────────────────────
CREATE POLICY "wishlist_all_own"     ON public.wishlists FOR ALL USING (auth.uid() = user_id);

-- ── Cart ──────────────────────────────────────────────────
CREATE POLICY "cart_all_own"         ON public.cart_items FOR ALL USING (auth.uid() = user_id);

-- ── Saved Cards ───────────────────────────────────────────
CREATE POLICY "card_all_own"         ON public.saved_cards FOR ALL USING (auth.uid() = user_id);

-- ── UPI IDs ───────────────────────────────────────────────
CREATE POLICY "upi_all_own"          ON public.upi_ids FOR ALL USING (auth.uid() = user_id);

-- ── Notification Prefs ────────────────────────────────────
CREATE POLICY "notif_all_own"        ON public.notification_preferences FOR ALL USING (auth.uid() = user_id);

-- ── Glamour Points ────────────────────────────────────────
CREATE POLICY "points_select_own"    ON public.glamour_points FOR SELECT USING (auth.uid() = user_id);

-- ── Points History ────────────────────────────────────────
CREATE POLICY "points_hist_select"   ON public.points_history FOR SELECT USING (auth.uid() = user_id);

-- ── Reviews ───────────────────────────────────────────────
CREATE POLICY "review_select_all"    ON public.reviews FOR SELECT USING (TRUE);
CREATE POLICY "review_insert_own"    ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "review_update_own"    ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "review_delete_own"    ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- ── Search History ────────────────────────────────────────
CREATE POLICY "search_all_own"       ON public.search_history FOR ALL USING (auth.uid() = user_id);

-- ── Coupon Usage ──────────────────────────────────────────
CREATE POLICY "coupon_usage_own"     ON public.coupon_usage FOR SELECT USING (auth.uid() = user_id);

-- ── Public Read-Only Tables ───────────────────────────────
CREATE POLICY "products_public_read"  ON public.products     FOR SELECT USING (TRUE);
CREATE POLICY "cats_public_read"      ON public.categories   FOR SELECT USING (TRUE);
CREATE POLICY "brands_public_read"    ON public.brands       FOR SELECT USING (TRUE);
CREATE POLICY "blog_public_read"      ON public.blog_posts   FOR SELECT USING (published = TRUE);
CREATE POLICY "banners_public_read"   ON public.promo_banners FOR SELECT USING (is_active = TRUE);
CREATE POLICY "coupons_public_read"   ON public.coupons      FOR SELECT USING (is_active = TRUE);


-- ============================================================
-- STORAGE BUCKET  (for user avatar uploads)
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', TRUE)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "avatar_upload_own"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

CREATE POLICY "avatar_update_own"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

CREATE POLICY "avatar_delete_own"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

CREATE POLICY "avatar_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');


-- ============================================================
-- SEED DATA — Categories
-- ============================================================
INSERT INTO public.categories (id, label, slug, icon, parent_id, sort_order) VALUES
  -- Top-level
  ('makeup',       'Makeup',       'makeup',       '💄', NULL, 1),
  ('skincare',     'Skincare',     'skincare',     '🧴', NULL, 2),
  ('haircare',     'Haircare',     'haircare',     '💇', NULL, 3),
  ('fragrance',    'Fragrance',    'fragrance',    '🌸', NULL, 4),
  ('bath-body',    'Bath & Body',  'bath-body',    '🛁', NULL, 5),
  ('men',          'Men',          'men',          '🧔', NULL, 6),
  ('wellness',     'Wellness',     'wellness',     '🌿', NULL, 7),
  ('nails',        'Nails',        'nails',        '💅', NULL, 8),
  ('appliances',   'Appliances',   'appliances',   '🔌', NULL, 9),
  ('luxe',         'Luxe',         'luxe',         '👑', NULL, 10),
  ('new-launches', 'New Launches', 'new-launches', '✨', NULL, 11),
  ('brands',       'Brands',       'brands',       '⭐', NULL, 12),
  ('offers',       'Offers',       'offers',       '🔥', NULL, 13),
  -- Makeup sub
  ('makeup-face',   'Face',           'face',           NULL, 'makeup',   1),
  ('makeup-eyes',   'Eyes',           'eyes',           NULL, 'makeup',   2),
  ('makeup-lips',   'Lips',           'lips',           NULL, 'makeup',   3),
  ('makeup-nails',  'Nails',          'nails',          NULL, 'makeup',   4),
  ('makeup-tools',  'Tools & Brushes','tools-brushes',  NULL, 'makeup',   5),
  -- Skincare sub
  ('skincare-cleanser',    'Cleanser',    'cleanser',    NULL, 'skincare', 1),
  ('skincare-moisturizer', 'Moisturizer', 'moisturizer', NULL, 'skincare', 2),
  ('skincare-serum',       'Serum',       'serum',       NULL, 'skincare', 3),
  ('skincare-sunscreen',   'Sunscreen',   'sunscreen',   NULL, 'skincare', 4),
  ('skincare-masks',       'Masks',       'masks',       NULL, 'skincare', 5),
  ('skincare-toner',       'Toner',       'toner',       NULL, 'skincare', 6),
  -- Haircare sub
  ('haircare-shampoo',    'Shampoo',    'shampoo',    NULL, 'haircare', 1),
  ('haircare-conditioner','Conditioner','conditioner', NULL, 'haircare', 2),
  ('haircare-oil',        'Hair Oil',   'hair-oil',   NULL, 'haircare', 3),
  ('haircare-serum',      'Hair Serum', 'hair-serum', NULL, 'haircare', 4),
  ('haircare-mask',       'Hair Mask',  'hair-mask',  NULL, 'haircare', 5),
  -- Fragrance sub
  ('fragrance-perfume',  'Perfume',    'perfume',    NULL, 'fragrance', 1),
  ('fragrance-body-mist','Body Mist',  'body-mist',  NULL, 'fragrance', 2),
  ('fragrance-deo',      'Deodorant',  'deodorant',  NULL, 'fragrance', 3),
  -- Bath & Body sub
  ('bath-wash',   'Body Wash',  'body-wash',  NULL, 'bath-body', 1),
  ('bath-lotion', 'Body Lotion','body-lotion',NULL, 'bath-body', 2),
  ('bath-butter', 'Body Butter','body-butter',NULL, 'bath-body', 3),
  ('bath-scrub',  'Body Scrub', 'body-scrub', NULL, 'bath-body', 4),
  -- Men sub
  ('men-beard',   'Beard Care', 'beard-care', NULL, 'men', 1),
  ('men-shaving', 'Shaving',    'shaving',    NULL, 'men', 2),
  ('men-face',    'Face Care',  'face-care',  NULL, 'men', 3)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SEED DATA — Brands
-- ============================================================
INSERT INTO public.brands (name, logo, color, slug, href) VALUES
  ('Lakmé',           'L',   '#e53935', 'lakme',          '/brands/lakme'),
  ('Maybelline',       'M',   '#7b1fa2', 'maybelline',     '/brands/maybelline'),
  ('L''Oréal',         'LO',  '#f57c00', 'loreal',         '/brands/loreal'),
  ('Mamaearth',        'MA',  '#2e7d32', 'mamaearth',      '/brands/mamaearth'),
  ('Sugar Cosmetics',  'SC',  '#ad1457', 'sugar',          '/brands/sugar'),
  ('The Ordinary',     'TO',  '#5d4037', 'the-ordinary',   '/brands/the-ordinary'),
  ('Minimalist',       'MI',  '#1565c0', 'minimalist',     '/brands/minimalist'),
  ('NYX',              'NY',  '#c62828', 'nyx',            '/brands/nyx'),
  ('Huda Beauty',      'HB',  '#880e4f', 'huda-beauty',    '/brands/huda'),
  ('MAC',              'MAC', '#212121', 'mac',            '/brands/mac'),
  ('WOW Skin Science', 'WOW', '#6a1b9a', 'wow',            '/brands/wow'),
  ('Biotique',         'BT',  '#00897b', 'biotique',       '/brands/biotique'),
  ('Himalaya',         'HM',  '#2e7d32', 'himalaya',       '/brands/himalaya'),
  ('Nivea',            'NV',  '#1565c0', 'nivea',          '/brands/nivea'),
  ('Garnier',          'GR',  '#c62828', 'garnier',        '/brands/garnier'),
  ('Colorbar',         'CB',  '#ad1457', 'colorbar',       '/brands/colorbar'),
  ('Dot & Key',        'DK',  '#e91e8c', 'dot-key',        '/brands/dot-key'),
  ('MCaffeine',        'MC',  '#5d4037', 'mcaffeine',      '/brands/mcaffeine'),
  ('The Body Shop',    'TBS', '#2e7d32', 'the-body-shop',  '/brands/the-body-shop'),
  ('Laneige',          'LG',  '#1565c0', 'laneige',        '/brands/laneige'),
  ('Beardo',           'BR',  '#5d4037', 'beardo',         '/brands/beardo'),
  ('Schwarzkopf',      'SK',  '#212121', 'schwarzkopf',    '/brands/schwarzkopf'),
  ('Denver',           'DN',  '#1565c0', 'denver',         '/brands/denver'),
  ('Engage',           'EN',  '#ad1457', 'engage',         '/brands/engage'),
  ('Livon',            'LV',  '#7b1fa2', 'livon',          '/brands/livon')
ON CONFLICT (slug) DO NOTHING;


-- ============================================================
-- SEED DATA — Coupons
-- ============================================================
INSERT INTO public.coupons (code, title, description, discount_type, discount_value, min_order, max_discount, valid_until) VALUES
  ('GLAM25',    'FLAT 25% OFF',   'On orders above ₹999',       'percent', 25,  999,  500,  NOW() + INTERVAL '30 days'),
  ('LIP3FOR2',  'BUY 2 GET 1',    'On all lipsticks',           'percent', 33,  0,    NULL, NOW() + INTERVAL '15 days'),
  ('FIRST200',  '₹200 OFF',       'First order above ₹499',     'flat',    200, 499,  200,  NOW() + INTERVAL '60 days'),
  ('UPI10',     '10% CASHBACK',   'Pay via UPI',                'percent', 10,  0,    200,  NOW() + INTERVAL '30 days'),
  ('WELCOME50', '₹50 OFF',        'Welcome gift for new users', 'flat',    50,  199,  50,   NOW() + INTERVAL '90 days'),
  ('SKINCARE20','20% OFF Skincare','On all skincare products',  'percent', 20,  499,  300,  NOW() + INTERVAL '20 days')
ON CONFLICT (code) DO NOTHING;


-- ============================================================
-- SEED DATA — Promo Banners
-- ============================================================
INSERT INTO public.promo_banners (title, sub, href, img, sort_order) VALUES
  ('Skincare Fest',  'Upto 60% OFF',     '/skincare', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop', 1),
  ('Makeup Mania',   'Buy 2 Get 1 Free', '/makeup',   'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=600&fit=crop', 2),
  ('Hair Care Sale', 'Flat 40% OFF',     '/haircare', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop', 3);


-- ============================================================
-- SEED DATA — Blog Posts
-- ============================================================
INSERT INTO public.blog_posts (id, title, slug, tag, tag_bg, tag_color, read_time, img, published) VALUES
  ('b1','10 Best Skincare Routines for Glowing Skin',   'best-skincare-routines', 'SKINCARE',  '#e8f5e9','#2e7d32','5 min','https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=500&fit=crop',TRUE),
  ('b2','Summer Makeup Looks: Stay Fresh All Day',      'summer-makeup-looks',    'MAKEUP',    '#fce4ec','#c2185b','4 min','https://images.unsplash.com/photo-1583241475880-083f84372725?w=800&h=500&fit=crop',TRUE),
  ('b3','Hair Care Secrets: Grow Longer Stronger Hair', 'hair-care-secrets',      'HAIRCARE',  '#fff3e0','#e65100','6 min','https://images.unsplash.com/photo-1634744940484-3a44e9ac0703?w=800&h=500&fit=crop',TRUE),
  ('b4','Top Fragrances of 2025: Editors Picks',        'top-fragrances-2025',    'FRAGRANCE', '#f3e5f5','#7b1fa2','3 min','https://images.unsplash.com/photo-1594707352515-a335d6b6d5df?w=800&h=500&fit=crop',TRUE)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SEED DATA — Products  (DEALS — 24 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, brand_color, price, mrp, discount, badge_bg, rating, reviews, img, category_id, is_deal) VALUES
  ('d1',  'Vitamin C Serum 20%',           'MINIMALIST',       '#1565c0', 399,  799,  50, '#00897b', 4.7, '8.2k',  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',    'skincare-serum',       TRUE),
  ('d2',  'Matte Liquid Lipstick',         'SUGAR',            '#880e4f', 299,  599,  50, '#880e4f', 4.4, '5.1k',  'https://images.unsplash.com/photo-1586495777744-4e6232bf2263?w=400&h=400&fit=crop',    'makeup-lips',          TRUE),
  ('d3',  'SPF 50 Sunscreen PA++++',       'MINIMALIST',       '#1565c0', 249,  499,  50, '#1565c0', 4.6, '6.7k',  'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&h=400&fit=crop',    'skincare-sunscreen',   TRUE),
  ('d4',  'Onion Shampoo 300ml',           'WOW',              '#6a1b9a', 299,  599,  50, '#37474f', 4.5, '12k',   'https://images.unsplash.com/photo-1522337360885-08fe0c3920be?w=400&h=400&fit=crop',    'haircare-shampoo',     TRUE),
  ('d5',  'HD Kajal 0.35g Deep Black',     'LAKMÉ',            '#e53935', 149,  299,  50, '#212121', 4.6, '31k',   'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400&h=400&fit=crop',    'makeup-eyes',          TRUE),
  ('d6',  'Purifying Neem Face Wash 150ml','HIMALAYA',         '#2e7d32', 129,  199,  35, '#2e7d32', 4.4, '22k',   'https://images.unsplash.com/photo-1604715892639-e07ceea2e08e?w=400&h=400&fit=crop',    'skincare-cleanser',    TRUE),
  ('d7',  'Rose Moisturising Body Lotion', 'NIVEA',            '#1565c0', 199,  349,  43, '#1565c0', 4.5, '16k',   'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=400&fit=crop',    'bath-lotion',          TRUE),
  ('d8',  'Bloom Floral EDP 50ml',         'ENGAGE',           '#ad1457', 449,  699,  36, '#ad1457', 4.3, '4.2k',  'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop',    'fragrance-perfume',    TRUE),
  ('d9',  'BB Cream SPF 20 Natural',       'LAKMÉ',            '#e53935', 349,  549,  36, '#e53935', 4.3, '14k',   'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',    'makeup-face',          TRUE),
  ('d10', 'Pure Aloe Vera Gel 300ml',      'MAMAEARTH',        '#388e3c', 249,  399,  38, '#388e3c', 4.5, '18k',   'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',      'skincare',             TRUE),
  ('d11', 'Argan Oil Shampoo 400ml',       'TRESEMMÉ',         '#1565c0', 399,  699,  43, '#1565c0', 4.3, '7.2k',  'https://images.unsplash.com/photo-1583394293214-b26e2e67cef0?w=400&h=400&fit=crop',    'haircare-shampoo',     TRUE),
  ('d12', 'Xtend Color Nail Polish 9ml',   'COLORBAR',         '#ad1457', 149,  249,  40, '#ad1457', 4.2, '3.6k',  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',    'nails',                TRUE),
  ('d13', 'Activated Charcoal Face Pack',  'HIMALAYA',         '#2e7d32', 179,  299,  40, '#37474f', 4.3, '9.1k',  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',    'skincare',             TRUE),
  ('d14', 'Lip Balm SPF 30 Tropical',      'BIOTIQUE',         '#00897b', 99,   199,  50, '#00897b', 4.3, '7.8k',  'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=400&h=400&fit=crop',    'makeup-lips',          TRUE),
  ('d15', 'Smoothening Hair Serum 100ml',  'LIVON',            '#7b1fa2', 159,  299,  47, '#7b1fa2', 4.4, '9.5k',  'https://images.unsplash.com/photo-1634744940484-3a44e9ac0703?w=400&h=400&fit=crop',    'haircare-serum',       TRUE),
  ('d16', 'Coffee Body Scrub 100g',        'MCAFFEINE',        '#5d4037', 349,  599,  42, '#5d4037', 4.5, '13k',   'https://images.unsplash.com/photo-1608217738438-b5bb6b6da5ca?w=400&h=400&fit=crop',    'bath-scrub',           TRUE),
  ('d17', 'Micellar Cleansing Water 400ml','GARNIER',          '#c62828', 249,  399,  38, '#558b2f', 4.4, '11k',   'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop',      'skincare-cleanser',    TRUE),
  ('d18', '12HR Stay Eyeshadow Palette',   'SWISS BEAUTY',     '#7b1fa2', 399,  799,  50, '#7b1fa2', 4.2, '3.8k',  'https://images.unsplash.com/photo-1583241475880-083f84372725?w=400&h=400&fit=crop',    'makeup-eyes',          TRUE),
  ('d19', 'Biotin Shampoo 250ml',          'MAMAEARTH',        '#388e3c', 299,  499,  40, '#388e3c', 4.4, '6.3k',  'https://images.unsplash.com/photo-1590155765720-3b5dfe8d0c70?w=400&h=400&fit=crop',    'haircare-shampoo',     TRUE),
  ('d20', 'Radiance Compact Powder',       'LAKMÉ',            '#e53935', 299,  449,  33, '#e53935', 4.3, '8.9k',  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',    'makeup-face',          TRUE),
  ('d21', 'Anti-Dandruff Shampoo 340ml',   'HEAD & SHOULDERS', '#1565c0', 249,  399,  38, '#1565c0', 4.4, '19k',   'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',    'haircare-shampoo',     TRUE),
  ('d22', 'Total Effects Night Cream 50g', 'OLAY',             '#d84315', 649,  999,  35, '#d84315', 4.5, '7.4k',  'https://images.unsplash.com/photo-1628944681206-57573b3b2f64?w=400&h=400&fit=crop',    'skincare-moisturizer', TRUE),
  ('d23', 'Colossal Kajal 12HR',           'MAYBELLINE',       '#e53935', 129,  179,  28, '#c62828', 4.7, '45k',   'https://images.unsplash.com/photo-1599305445671-5c0dd29e9e03?w=400&h=400&fit=crop',    'makeup-eyes',          TRUE),
  ('d24', 'Beard Growth Oil 50ml',         'BEARDO',           '#5d4037', 399,  699,  43, '#5d4037', 4.4, '8.1k',  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop',    'men-beard',            TRUE)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SEED DATA — Products  (NEW LAUNCHES — 24 products)
-- ============================================================
INSERT INTO public.products (id, name, brand, brand_color, price, mrp, discount, rating, reviews, img, category_id, is_new_launch) VALUES
  ('n1',  'Naked Eyeshadow Palette 12 Pan',  'SUGAR',        '#7b1fa2', 1299, 1899, 31, 4.5, '1.2k', 'https://images.unsplash.com/photo-1574201635742-e0d9c70e726e?w=400&h=400&fit=crop',   'makeup-eyes',          TRUE),
  ('n2',  'SPF 50+ Sunscreen PA++++',        'MINIMALIST',   '#1565c0', 499,  699,  29, 4.6, '7.8k', 'https://images.unsplash.com/photo-1601049177266-e9a6d04e0688?w=400&h=400&fit=crop',   'skincare-sunscreen',   TRUE),
  ('n3',  'Nail Xtreme Color Glitter 9ml',   'LAKMÉ',        '#e53935', 229,  349,  34, 4.2, '1.9k', 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop',      'nails',                TRUE),
  ('n4',  'Rose Water Brightening Toner',    'BIOTIQUE',     '#00897b', 299,  450,  33, 4.3, '5.4k', 'https://images.unsplash.com/photo-1509587522-ceb6f2e0b481?w=400&h=400&fit=crop',      'skincare-toner',       TRUE),
  ('n5',  'Glass Skin Radiance Serum 30ml',  'DOT & KEY',    '#e91e8c', 699,  999,  30, 4.5, '3.2k', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',      'skincare-serum',       TRUE),
  ('n6',  'Matte HD Liquid Foundation',      'HUDA BEAUTY',  '#880e4f', 2499, 3299, 24, 4.5, '987',  'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',   'makeup-face',          TRUE),
  ('n7',  'Peptide Eye Cream 15ml',          'THE ORDINARY', '#212121', 899,  1299, 31, 4.4, '2.1k', 'https://images.unsplash.com/photo-1563841930606-67afcef39cd6?w=400&h=400&fit=crop',   'skincare',             TRUE),
  ('n8',  'Scalp Revitalising Serum 100ml',  'MAMAEARTH',    '#388e3c', 549,  799,  31, 4.3, '2.4k', 'https://images.unsplash.com/photo-1490645034245-4afe7b30b4a9?w=400&h=400&fit=crop',   'haircare-serum',       TRUE),
  ('n9',  'Butter Lip Gloss Sheer Rose',     'NYX',          '#c62828', 699,  999,  30, 4.4, '1.5k', 'https://images.unsplash.com/photo-1588776814546-1a5e8cf97a86?w=400&h=400&fit=crop',   'makeup-lips',          TRUE),
  ('n10', 'Niacinamide 10% + Zinc 1% 30ml',  'MINIMALIST',   '#1565c0', 349,  599,  42, 4.7, '11k',  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',   'skincare-serum',       TRUE),
  ('n11', 'Color Protect Shampoo 250ml',     'SCHWARZKOPF',  '#212121', 449,  699,  36, 4.4, '1.9k', 'https://images.unsplash.com/photo-1601049177542-9e9aba6b50db?w=400&h=400&fit=crop',   'haircare-shampoo',     TRUE),
  ('n12', 'Bleu Intense EDP 100ml',          'DENVER',       '#1565c0', 549,  899,  39, 4.3, '3.6k', 'https://images.unsplash.com/photo-1594707352515-a335d6b6d5df?w=400&h=400&fit=crop',   'fragrance-perfume',    TRUE),
  ('n13', 'Glycolic Acid Glow Drops 30ml',   'L''ORÉAL',     '#f57c00', 799,  1199, 33, 4.3, '1.8k', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',   'skincare-serum',       TRUE),
  ('n14', 'Sky High Lash Mascara',           'MAYBELLINE',   '#e53935', 549,  799,  31, 4.6, '6.2k', 'https://images.unsplash.com/photo-1560012127-48ada099b13d?w=400&h=400&fit=crop',      'makeup-eyes',          TRUE),
  ('n15', 'Hyaluronic Acid Serum 30ml',      'DOT & KEY',    '#e91e8c', 649,  999,  35, 4.5, '4.6k', 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=400&h=400&fit=crop',   'skincare-serum',       TRUE),
  ('n16', 'Absolute Repair Hair Mask 200ml', 'L''ORÉAL',     '#f57c00', 499,  799,  38, 4.5, '2.7k', 'https://images.unsplash.com/photo-1568393948086-1a5dc1e99e10?w=400&h=400&fit=crop',   'haircare-mask',        TRUE),
  ('n17', '9to5 Pore Minimizer Primer',      'LAKMÉ',        '#e53935', 349,  549,  36, 4.3, '3.1k', 'https://images.unsplash.com/photo-1522335578-4f1b7f9df61c?w=400&h=400&fit=crop',      'makeup-face',          TRUE),
  ('n18', 'Strawberry Body Butter 200ml',    'THE BODY SHOP','#2e7d32', 899,  1299, 31, 4.6, '4.3k', 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop',   'bath-butter',          TRUE),
  ('n19', 'Granactive Retinoid 2% Emulsion', 'THE ORDINARY', '#212121', 749,  1199, 38, 4.4, '2.9k', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',      'skincare',             TRUE),
  ('n20', 'Waterproof Kajal Intense Black',  'LAKMÉ',        '#e53935', 199,  299,  33, 4.5, '28k',  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',   'makeup-eyes',          TRUE),
  ('n21', 'Apple Cider Vinegar Shampoo',     'WOW',          '#6a1b9a', 449,  699,  36, 4.4, '5.1k', 'https://images.unsplash.com/photo-1583394293214-b26e2e67cef0?w=400&h=400&fit=crop',   'haircare-shampoo',     TRUE),
  ('n22', 'Liquid Illuminating Drops',       'SWISS BEAUTY', '#7b1fa2', 399,  599,  33, 4.2, '1.3k', 'https://images.unsplash.com/photo-1574600034992-c1a03e57e73c?w=400&h=400&fit=crop',   'makeup-face',          TRUE),
  ('n23', 'Biotin 10000mcg Hair Gummies',    'MAMAEARTH',    '#388e3c', 549,  799,  31, 4.4, '7.2k', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop',   'wellness',             TRUE),
  ('n24', 'Sleeping Lip Mask Vanilla 20g',   'LANEIGE',      '#1565c0', 849,  1299, 35, 4.7, '6.8k', 'https://images.unsplash.com/photo-1609248231760-fb57b5888dc6?w=400&h=400&fit=crop',   'makeup-lips',          TRUE)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- END OF SCHEMA
-- ============================================================
